/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getEvent } from "../graphql/queries";
import { updateEvent } from "../graphql/mutations";
export default function EventUpdateForm(props) {
  const {
    id: idProp,
    event: eventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    eventId: "",
    timeAndDate: "",
    eventName: "",
    eventPoster: "",
    place: "",
    price: "",
    capacity: "",
    eventPlanner: "",
    description: "",
  };
  const [eventId, setEventId] = React.useState(initialValues.eventId);
  const [timeAndDate, setTimeAndDate] = React.useState(
    initialValues.timeAndDate
  );
  const [eventName, setEventName] = React.useState(initialValues.eventName);
  const [eventPoster, setEventPoster] = React.useState(
    initialValues.eventPoster
  );
  const [place, setPlace] = React.useState(initialValues.place);
  const [price, setPrice] = React.useState(initialValues.price);
  const [capacity, setCapacity] = React.useState(initialValues.capacity);
  const [eventPlanner, setEventPlanner] = React.useState(
    initialValues.eventPlanner
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventRecord
      ? { ...initialValues, ...eventRecord }
      : initialValues;
    setEventId(cleanValues.eventId);
    setTimeAndDate(cleanValues.timeAndDate);
    setEventName(cleanValues.eventName);
    setEventPoster(cleanValues.eventPoster);
    setPlace(cleanValues.place);
    setPrice(cleanValues.price);
    setCapacity(cleanValues.capacity);
    setEventPlanner(cleanValues.eventPlanner);
    setDescription(cleanValues.description);
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(eventModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getEvent.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEvent
        : eventModelProp;
      setEventRecord(record);
    };
    queryData();
  }, [idProp, eventModelProp]);
  React.useEffect(resetStateValues, [eventRecord]);
  const validations = {
    eventId: [{ type: "Required" }],
    timeAndDate: [{ type: "Required" }],
    eventName: [{ type: "Required" }],
    eventPoster: [],
    place: [{ type: "Required" }],
    price: [],
    capacity: [],
    eventPlanner: [{ type: "Required" }],
    description: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          eventId,
          timeAndDate,
          eventName,
          eventPoster: eventPoster ?? null,
          place,
          price: price ?? null,
          capacity: capacity ?? null,
          eventPlanner,
          description: description ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateEvent.replaceAll("__typename", ""),
            variables: {
              input: {
                id: eventRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Event id"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={eventId}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              eventId: value,
              timeAndDate,
              eventName,
              eventPoster,
              place,
              price,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.eventId ?? value;
          }
          if (errors.eventId?.hasError) {
            runValidationTasks("eventId", value);
          }
          setEventId(value);
        }}
        onBlur={() => runValidationTasks("eventId", eventId)}
        errorMessage={errors.eventId?.errorMessage}
        hasError={errors.eventId?.hasError}
        {...getOverrideProps(overrides, "eventId")}
      ></TextField>
      <TextField
        label="Time and date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={timeAndDate && convertToLocal(new Date(timeAndDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate: value,
              eventName,
              eventPoster,
              place,
              price,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.timeAndDate ?? value;
          }
          if (errors.timeAndDate?.hasError) {
            runValidationTasks("timeAndDate", value);
          }
          setTimeAndDate(value);
        }}
        onBlur={() => runValidationTasks("timeAndDate", timeAndDate)}
        errorMessage={errors.timeAndDate?.errorMessage}
        hasError={errors.timeAndDate?.hasError}
        {...getOverrideProps(overrides, "timeAndDate")}
      ></TextField>
      <TextField
        label="Event name"
        isRequired={true}
        isReadOnly={false}
        value={eventName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName: value,
              eventPoster,
              place,
              price,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.eventName ?? value;
          }
          if (errors.eventName?.hasError) {
            runValidationTasks("eventName", value);
          }
          setEventName(value);
        }}
        onBlur={() => runValidationTasks("eventName", eventName)}
        errorMessage={errors.eventName?.errorMessage}
        hasError={errors.eventName?.hasError}
        {...getOverrideProps(overrides, "eventName")}
      ></TextField>
      <TextField
        label="Event poster"
        isRequired={false}
        isReadOnly={false}
        value={eventPoster}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster: value,
              place,
              price,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.eventPoster ?? value;
          }
          if (errors.eventPoster?.hasError) {
            runValidationTasks("eventPoster", value);
          }
          setEventPoster(value);
        }}
        onBlur={() => runValidationTasks("eventPoster", eventPoster)}
        errorMessage={errors.eventPoster?.errorMessage}
        hasError={errors.eventPoster?.hasError}
        {...getOverrideProps(overrides, "eventPoster")}
      ></TextField>
      <TextField
        label="Place"
        isRequired={true}
        isReadOnly={false}
        value={place}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster,
              place: value,
              price,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.place ?? value;
          }
          if (errors.place?.hasError) {
            runValidationTasks("place", value);
          }
          setPlace(value);
        }}
        onBlur={() => runValidationTasks("place", place)}
        errorMessage={errors.place?.errorMessage}
        hasError={errors.place?.hasError}
        {...getOverrideProps(overrides, "place")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster,
              place,
              price: value,
              capacity,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Capacity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={capacity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster,
              place,
              price,
              capacity: value,
              eventPlanner,
              description,
            };
            const result = onChange(modelFields);
            value = result?.capacity ?? value;
          }
          if (errors.capacity?.hasError) {
            runValidationTasks("capacity", value);
          }
          setCapacity(value);
        }}
        onBlur={() => runValidationTasks("capacity", capacity)}
        errorMessage={errors.capacity?.errorMessage}
        hasError={errors.capacity?.hasError}
        {...getOverrideProps(overrides, "capacity")}
      ></TextField>
      <TextField
        label="Event planner"
        isRequired={true}
        isReadOnly={false}
        value={eventPlanner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster,
              place,
              price,
              capacity,
              eventPlanner: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.eventPlanner ?? value;
          }
          if (errors.eventPlanner?.hasError) {
            runValidationTasks("eventPlanner", value);
          }
          setEventPlanner(value);
        }}
        onBlur={() => runValidationTasks("eventPlanner", eventPlanner)}
        errorMessage={errors.eventPlanner?.errorMessage}
        hasError={errors.eventPlanner?.hasError}
        {...getOverrideProps(overrides, "eventPlanner")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              eventId,
              timeAndDate,
              eventName,
              eventPoster,
              place,
              price,
              capacity,
              eventPlanner,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || eventModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || eventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
