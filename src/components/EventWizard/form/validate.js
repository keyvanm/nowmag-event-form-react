import React from 'react'
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
  // owner_email: yup.string().email().required(),
});

export default (values, props) => {
  let errors = {}

  if (!eventSchema.name.isValidSync(values.name)) {
    errors.name = <p>Please provide your event <b>title</b></p>
  }
  if (!eventSchema.category.isValidSync(values.category)) {
    errors.category = <p>Please pick a <b>category</b> for your event</p>
  }
  if (!yup.string().required().isValidSync(values.description)) {
    errors.description = <p>Please write a <b>description</b> for your event</p>
  } else if (!yup.string().max(400).isValidSync(values.description)) {
    errors.description = <p>Please keep the <b>description</b> under 400 characters</p>
  }

  if (values.location.isNewVenue) {
    const { newVenue } = values.location;
    if (!newVenue.name) {
      errors.location = <p>Please provide the name of the new <b>venue</b></p>
    } else if (!newVenue.address) {
      errors.location = <p>Please provide the address of the new <b>venue</b></p>
    }
  } else {
    if (!values.location.existingVenue) {
      errors.location = <p>Please pick a <b>location</b> from the list</p>
    }
  }

  if (!eventSchema.start.isValidSync(values.start)) {
    errors.start = <p>Please provide a valid <b>start date and time</b> for your event</p>
  } else if (values.end && !eventSchema.end.isValidSync(values.end)) {
    errors.end = <p>Please provide a valid <b>end date and time</b> for your event, or remove it entirely</p>
  } else if (values.end && values.end.isBefore(values.start)) {
    errors.end = <p><b>End date</b> cannot be before start date</p>
  }
  const { website, phone_number, email, facebook } = values;
  if (!(website || phone_number || email || facebook)) {
    errors.website = <p>At least one of the <b>website, phone number, email or facebook</b> is needed</p>
  }
  if (website && !eventSchema.website.isValidSync(website)) {
    errors.website = <p>Please make sure the <b>website</b> url is formatted like http(s)://...</p>
  }
  if (phone_number && !eventSchema.phone_number.isValidSync(phone_number)) {
    errors.phone_number = <p>Please format the <b>phone number</b> like so</p>
  }
  if (email && !eventSchema.email.isValidSync(email)) {
    errors.email = <p>Please format the <b>email</b></p>
  }
  if (facebook && !eventSchema.facebook.isValidSync(facebook)) {
    errors.facebook = <p>Please format the <b>facebook</b> page like so</p>
  }

  // if (!values.owner_email) { 
  //   errors.owner_email = <p>Please provide an <b>email</b> you have access to. We need this in order to send you the confirmation</p>
  // } else if (!eventSchema.owner_email.isValidSync(values.owner_email)) {
  //   errors.owner_email = <p>Please provide a valid <b>email</b> address</p>
  // }
  return errors;
}
