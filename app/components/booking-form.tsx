'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setSelectedVehicle, setBookingDates, clearCurrentBooking } from '@/src/store/features/booking/bookingSlice';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { Vehicle } from "@/src/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Define the form validation schema
const bookingFormSchema = z.object({
  vehicleId: z.string({
    required_error: "Please select a vehicle.",
  }),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  endDate: z.date({
    required_error: "Please select an end date.",
  }),
}).refine(data => data.startDate <= data.endDate, {
  message: "End date cannot be earlier than start date",
  path: ["endDate"],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  selectedVehicleId?: string | null;
}

export function BookingForm({ selectedVehicleId }: BookingFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      vehicleId: selectedVehicleId || '',
    },
  });

  // Fetch vehicles from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load vehicles. Please try again.',
          variant: 'destructive',
        });
      }
    };
    fetchVehicles();
  }, [toast]);

  // Calculate total price when dates or vehicle changes
  useEffect(() => {
    const values = form.getValues();
    if (values.startDate && values.endDate && values.vehicleId) {
      const selectedVehicle = vehicles.find(v => v.id === values.vehicleId);
      if (selectedVehicle) {
        const days = differenceInDays(values.endDate, values.startDate) + 1;
        // Convert Decimal to number for calculation
        const pricePerDay = Number(selectedVehicle.pricePerDay);
        setTotalPrice(pricePerDay * days);
      }
    }
  }, [form.watch(['startDate', 'endDate', 'vehicleId']), vehicles]);

  const onSubmit = async (values: BookingFormValues) => {
    if (!session?.user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to make a booking.',
        variant: 'destructive',
      });
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const { vehicleId, startDate, endDate } = values;
      const bookingVehicle = vehicles.find(v => v.id === vehicleId);
      
      if (!bookingVehicle) {
        throw new Error('Vehicle not found');
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          totalAmount: totalPrice,
        }),
        credentials: 'include', // Add this to include cookies
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create booking' }));
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const booking = await response.json();
      
      // Fetch the vehicle details before dispatching
      const vehicleResponse = await fetch(`/api/vehicles/${vehicleId}`);
      if (!vehicleResponse.ok) {
        throw new Error('Failed to fetch vehicle details');
      }
      const vehicleData = await vehicleResponse.json();
      
      // Transform the vehicle data to match the expected Vehicle type
      const transformedVehicle: Vehicle = {
        id: vehicleData.id,
        name: vehicleData.name,
        image: vehicleData.image,
        images: vehicleData.images || [],
        price: vehicleData.price,
        pricePerDay: vehicleData.pricePerDay,
        pricePerHour: vehicleData.pricePerHour || 0,
        specs: vehicleData.specs || [],
        description: vehicleData.description || '',
        category: vehicleData.category || 'STANDARD',
        available: vehicleData.available ?? true,
        featured: vehicleData.featured ?? false,
        createdAt: vehicleData.createdAt ? new Date(vehicleData.createdAt) : new Date(),
        updatedAt: vehicleData.updatedAt ? new Date(vehicleData.updatedAt) : new Date()
      };
      
      dispatch(setSelectedVehicle(transformedVehicle));
      dispatch(setBookingDates({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
      }));
      dispatch(clearCurrentBooking());

      toast({
        title: 'Success',
        description: 'Your booking has been confirmed! Check your email for details.',
      });

      router.push('/bookings');
    } catch (error: any) {
      console.error('Booking failed:', error);
      toast({
        title: 'Booking Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Book Your Vehicle</h2>
        
        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Vehicle</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {vehicle.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {totalPrice > 0 && (
          <div className="text-lg font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Book Now'
          )}
        </Button>
      </form>
    </Form>
  );
}
