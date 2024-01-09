/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField, DropZone, Text, VisuallyHidden, ScrollView} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API, Storage } from "aws-amplify";
import { createEvent } from "../graphql/mutations";
import { Label } from "reactstrap";
export default function EventCreator(props) {
  const {
    clearOnSuccess = true,
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
    seatsLeft: "",
  };
const acceptedFileTypes = ['image/png', 'image/jpeg'];
  const [eventId, setEventId] = React.useState(initialValues.eventId);
  const [timeAndDate, setTimeAndDate] = React.useState(initialValues.timeAndDate);
  const [eventName, setEventName] = React.useState(initialValues.eventName);
  const [eventPoster, setEventPoster] = React.useState(initialValues.eventPoster);
  const [files, setFiles] = React.useState([]);
  const hiddenInput = React.useRef(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [place, setPlace] = React.useState(initialValues.place);
  const [price, setPrice] = React.useState(initialValues.price);
  const [capacity, setCapacity] = React.useState(initialValues.capacity);
  const [eventPlanner, setEventPlanner] = React.useState(initialValues.eventPlanner);
  const [description, setDescription] = React.useState(initialValues.description);
  const [seatsLeft, setSeatsLeft] = React.useState(initialValues.seatsLeft);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEventId(initialValues.eventId);
    setTimeAndDate(initialValues.timeAndDate);
    setEventName(initialValues.eventName);
    setEventPoster(initialValues.eventPoster);
    setPlace(initialValues.place);
    setPrice(initialValues.price);
    setCapacity(initialValues.capacity);
    setEventPlanner(initialValues.eventPlanner);
    setDescription(initialValues.description);
    setSeatsLeft(initialValues.seatsLeft);

    setErrors({});
  };
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
    seatsLeft: [],
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

  const handleUpload = async (imageFile) => {
    try {
      let storageKey = '';
      const resultKey = await Storage.put(imageFile.name, imageFile, {
        level: 'protected',
      });
      storageKey = resultKey.key; // Adjust according to your Storage API's return structure
      console.log('Uploaded image successfully: ' + storageKey);
      setEventPoster(storageKey);
      // Handle successful upload logic here if necessary
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  const onFilePickerChange = (event) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setFiles(Array.from(files));
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
          eventPoster,
          place,
          price,
          capacity,
          eventPlanner,
          description,
          seatsLeft,
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
            query: createEvent.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EventCreator")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Event id</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={eventId}
        onChange={(e) => {
          let { value } = e.target;
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
              seatsLeft,
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
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Time and date</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
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
              seatsLeft,
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
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Event name</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
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
              seatsLeft,
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
      <Label>Event poster</Label>
      <DropZone
          label="Event poster"
          acceptedFileTypes={acceptedFileTypes}
          onDropComplete={({ acceptedFiles, rejectedFiles }) => {
          setFiles(acceptedFiles);
          }}
      >
          <Flex direction="column" alignItems="center">
          <Text>Drag images here or</Text>
          <Button size="small" onClick={() => hiddenInput.current.click()}>
              Browse
          </Button>
          </Flex>
          <VisuallyHidden>
          <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={onFilePickerChange}
              multiple={true}
              accept={acceptedFileTypes.join(',')}
          />
          </VisuallyHidden>
        </DropZone>
        {files.map((file) => (
        <Text key={file.name}>{file.name}</Text>
        ))}
      <Button
            children="Upload Photo"
            type="submit"
            variation="primary"
            onClick={(event) => {
              event.preventDefault();
              handleUpload(files[0]);
            }}
          ></Button>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Place</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
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
              seatsLeft,
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
              seatsLeft,
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
              seatsLeft,
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
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Event planner</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
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
              seatsLeft,
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
              seatsLeft,
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
      <TextField
        label="Seats left"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={seatsLeft}
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
              capacity,
              eventPlanner,
              description,
              seatsLeft: value,
            };
            const result = onChange(modelFields);
            value = result?.seatsLeft ?? value;
          }
          if (errors.seatsLeft?.hasError) {
            runValidationTasks("seatsLeft", value);
          }
          setSeatsLeft(value);
        }}
        onBlur={() => runValidationTasks("seatsLeft", seatsLeft)}
        errorMessage={errors.seatsLeft?.errorMessage}
        hasError={errors.seatsLeft?.hasError}
        {...getOverrideProps(overrides, "seatsLeft")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}