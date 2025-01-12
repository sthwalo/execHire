'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setSelectedVehicle, setBookingDates, setCurrentBooking } from '@/src/store/features/booking/bookingSlice';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  vehicleId: z.string({
    required_error: "Please select a vehicle.",
  }),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  endDate: z.date({
    required_error: "Please select an end date.",
  }),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type Vehicle = {
  id: string;
  name: string;
  price: string;
  pricePerDay: number;
  image: string;
  category: string;
  description: string;
  available: boolean;
};

export function BookingForm() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Fetch vehicles from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles');
        const data = await response.json();
        setVehicles(data.filter((v: Vehicle) => v.available));
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
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
      const vehicle = vehicles.find(v => v.id === values.vehicleId);
      if (vehicle) {
        const days = differenceInDays(values.endDate, values.startDate) + 1;
        setTotalPrice(vehicle.pricePerDay * days);
      }
    }
  }, [form.watch(['startDate', 'endDate', 'vehicleId']), vehicles]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const { vehicleId, startDate, endDate } = values;
      const vehicle = vehicles.find(v => v.id === vehicleId);
      
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
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const booking = await response.json();
      
      dispatch(setSelectedVehicle(vehicleId));
      dispatch(setBookingDates({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
      }));
      dispatch(setCurrentBooking({
        id: booking.id,
        serviceType: 'vehicle-rental',
        date: format(startDate, 'yyyy-MM-dd'),
        time: '10:00',
        status: 'pending',
        location: 'Main Branch'
      }));

      toast({
        title: 'Success',
        description: 'Your booking has been confirmed! Check your email for details.',
      });

    } catch (error) {
      console.error('Booking failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{vehicle.name}</span>
                          <span className="text-muted-foreground">
                            ${vehicle.pricePerDay}/day
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Price</p>
                    <p className="text-sm text-muted-foreground">
                      Including all taxes and fees
                    </p>
                  </div>
                  <p className="text-2xl font-bold">${totalPrice}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
