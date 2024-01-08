/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateEvent2InputValues = {
    eventId?: number;
    timeAndDate?: string;
    eventName?: string;
    eventPoster?: string;
    place?: string;
    price?: number;
    capacity?: number;
    eventPlanner?: string;
    description?: string;
    seatsLeft?: number;
};
export declare type CreateEvent2ValidationValues = {
    eventId?: ValidationFunction<number>;
    timeAndDate?: ValidationFunction<string>;
    eventName?: ValidationFunction<string>;
    eventPoster?: ValidationFunction<string>;
    place?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    capacity?: ValidationFunction<number>;
    eventPlanner?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    seatsLeft?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateEvent2OverridesProps = {
    CreateEvent2Grid?: PrimitiveOverrideProps<GridProps>;
    eventId?: PrimitiveOverrideProps<TextFieldProps>;
    timeAndDate?: PrimitiveOverrideProps<TextFieldProps>;
    eventName?: PrimitiveOverrideProps<TextFieldProps>;
    eventPoster?: PrimitiveOverrideProps<TextFieldProps>;
    place?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    capacity?: PrimitiveOverrideProps<TextFieldProps>;
    eventPlanner?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    seatsLeft?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreateEvent2Props = React.PropsWithChildren<{
    overrides?: CreateEvent2OverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CreateEvent2InputValues) => CreateEvent2InputValues;
    onSuccess?: (fields: CreateEvent2InputValues) => void;
    onError?: (fields: CreateEvent2InputValues, errorMessage: string) => void;
    onChange?: (fields: CreateEvent2InputValues) => CreateEvent2InputValues;
    onValidate?: CreateEvent2ValidationValues;
} & React.CSSProperties>;
export default function CreateEvent2(props: CreateEvent2Props): React.ReactElement;
