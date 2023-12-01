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
import { createUser } from "../graphql/mutations";
export default function UserCreateForm(props) {
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
    studentId: "",
    name: "",
    surname: "",
    METUmail: "",
    yoS: "",
  };
  const [studentId, setStudentId] = React.useState(initialValues.studentId);
  const [name, setName] = React.useState(initialValues.name);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [METUmail, setMETUmail] = React.useState(initialValues.METUmail);
  const [yoS, setYoS] = React.useState(initialValues.yoS);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setStudentId(initialValues.studentId);
    setName(initialValues.name);
    setSurname(initialValues.surname);
    setMETUmail(initialValues.METUmail);
    setYoS(initialValues.yoS);
    setErrors({});
  };
  const validations = {
    studentId: [{ type: "Required" }],
    name: [{ type: "Required" }],
    surname: [],
    METUmail: [{ type: "Required" }],
    yoS: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          studentId,
          name,
          surname,
          METUmail,
          yoS,
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
            query: createUser.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Student id"
        isRequired={true}
        isReadOnly={false}
        value={studentId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId: value,
              name,
              surname,
              METUmail,
              yoS,
            };
            const result = onChange(modelFields);
            value = result?.studentId ?? value;
          }
          if (errors.studentId?.hasError) {
            runValidationTasks("studentId", value);
          }
          setStudentId(value);
        }}
        onBlur={() => runValidationTasks("studentId", studentId)}
        errorMessage={errors.studentId?.errorMessage}
        hasError={errors.studentId?.hasError}
        {...getOverrideProps(overrides, "studentId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              name: value,
              surname,
              METUmail,
              yoS,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Surname"
        isRequired={false}
        isReadOnly={false}
        value={surname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              name,
              surname: value,
              METUmail,
              yoS,
            };
            const result = onChange(modelFields);
            value = result?.surname ?? value;
          }
          if (errors.surname?.hasError) {
            runValidationTasks("surname", value);
          }
          setSurname(value);
        }}
        onBlur={() => runValidationTasks("surname", surname)}
        errorMessage={errors.surname?.errorMessage}
        hasError={errors.surname?.hasError}
        {...getOverrideProps(overrides, "surname")}
      ></TextField>
      <TextField
        label="Met umail"
        isRequired={true}
        isReadOnly={false}
        value={METUmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              name,
              surname,
              METUmail: value,
              yoS,
            };
            const result = onChange(modelFields);
            value = result?.METUmail ?? value;
          }
          if (errors.METUmail?.hasError) {
            runValidationTasks("METUmail", value);
          }
          setMETUmail(value);
        }}
        onBlur={() => runValidationTasks("METUmail", METUmail)}
        errorMessage={errors.METUmail?.errorMessage}
        hasError={errors.METUmail?.hasError}
        {...getOverrideProps(overrides, "METUmail")}
      ></TextField>
      <TextField
        label="Yo s"
        isRequired={false}
        isReadOnly={false}
        value={yoS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              name,
              surname,
              METUmail,
              yoS: value,
            };
            const result = onChange(modelFields);
            value = result?.yoS ?? value;
          }
          if (errors.yoS?.hasError) {
            runValidationTasks("yoS", value);
          }
          setYoS(value);
        }}
        onBlur={() => runValidationTasks("yoS", yoS)}
        errorMessage={errors.yoS?.errorMessage}
        hasError={errors.yoS?.hasError}
        {...getOverrideProps(overrides, "yoS")}
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
