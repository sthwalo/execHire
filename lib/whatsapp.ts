export const createWhatsAppLink = (vehicleName?: string) => {
  const phoneNumber = '+27733366385';
  const message = encodeURIComponent(
    vehicleName
      ? `Hello, I would like to inquire about booking the ${vehicleName}.`
      : 'Hello, I would like to inquire about booking a vehicle.'
  );
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
};
