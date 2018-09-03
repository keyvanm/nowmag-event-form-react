import * as yup from 'yup';

export const eventSchema = /*yup.object*/({
  name: yup.string().required(),
  category: yup
    .string()
    .required(),
  description: yup.string().max(400).required(),
  location: yup.object({
    isNewVenue: yup.bool().required(),
    existingVenue: yup.string(),
    newVenue: yup.object({ name: yup.string(), address: yup.string() }).required()
  }),
  start: yup.date().required(),
  end: yup.date(),
  website: yup.string().url(),
  phone_number: yup.string(),  
  facebook: yup.string().url(),
  email: yup.string().email(),
  contactEmail: yup.string().email().required(),
});

export default (values, props) => {
  let errors = {}

  if (!eventSchema.name.isValidSync(values.name)) {
    errors.name = "Please provide your event title"
  }
  if (!eventSchema.category.isValidSync(values.category)) {
    errors.category = "Please pick a category for your event"
  }
  if (!yup.string().required().isValidSync(values.description)) {
    errors.description = "Please write a description for your event"
  } else if (!yup.string().max(400).isValidSync(values.description)) {
    errors.description = "Please keep the description under 400 characters"
  }

  if (values.location.isNewVenue) {
    const { newVenue } = values.location;
    if (!newVenue.name) {
      errors.location = "Please provide the name of the new venue"
    } else if (!newVenue.address) {
      errors.location = "Please provide the address of the new venue"
    }
  } else {
    if (!values.location.existingVenue) {
      errors.location = "Please pick a location from the list"
    }
  }

  if (!eventSchema.start.isValidSync(values.start)) {
    errors.start = "Please provide a valid start date and time for your event"
  } else if (values.end && !eventSchema.end.isValidSync(values.end)) {
    errors.end = "Please provide a valid end date and time for your event, or remove it entirely"
  } else if (values.end && values.end.isBefore(values.start)) {
    errors.end = "End date cannot be before start date"
  }
  const { website, phone_number, email, facebook } = values;
  if (!(website || phone_number || email || facebook)) {
    errors.website = "At least one of the website, phone number, email or facebook is needed"
  }
  if (website && !eventSchema.website.isValidSync(website)) {
    errors.website = "Please make sure the website url is formatted like http(s)://..."
  }
  if (phone_number && !eventSchema.phone_number.isValidSync(phone_number)) {
    errors.phone_number = "Please format the phone number like so"
  }
  if (email && !eventSchema.email.isValidSync(email)) {
    errors.email = "Please format the email"
  }
  if (facebook && !eventSchema.facebook.isValidSync(facebook)) {
    errors.facebook = "Please format the facebook page like so"
  }

  if (!values.contactEmail) { 
    errors.contactEmail = "Please provide an email you have access to. We need this in order to send you the confirmation"
  } else if (!eventSchema.contactEmail.isValidSync(values.contactEmail)) {
    errors.contactEmail = "Please format the email"
  }
  return errors;
}