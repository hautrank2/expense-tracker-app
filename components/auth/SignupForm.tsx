import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";

export type SignupFormProps = {
  defaultValues?: Partial<SignupValues>;
  afterSuccess?: (values: SignupValues) => void;
  onCancel?: () => void;
};

export type SignupValues = {
  email: string;
  password: string;
};

export const SignupForm = ({
  defaultValues,
  afterSuccess,
  onCancel,
}: SignupFormProps) => {
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupValues>({
    mode: "onChange",
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: SignupValues) => {
    try {
      setIsSubmitting(true);
      const apiRes = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      console.log("apiRes", apiRes);

      afterSuccess?.({
        email: values.email.trim(),
        password: values.password,
      });
    } catch (err: unknown) {
      let str = "";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            str = "The email address has already been used.";
            break;
          default:
            str = "Something wrong";
        }
      }
      setSnackbar(str);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex flex-col gap-2 flex-1">
      <Snackbar
        visible={!!snackbar}
        onDismiss={() => setSnackbar(null)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbar(null);
          },
        }}
      >
        {snackbar}
      </Snackbar>
      <View className="flex flex-col gap-2">
        <View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Please enter your email",
              validate: (value) => {
                const trimmed = value.trim();

                if (!trimmed) {
                  return "Please enter your email";
                }

                if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
                  return "Please enter a valid email address";
                }

                if (trimmed.length > 100) {
                  return "Email must be no longer than 100 characters";
                }

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                disabled={isSubmitting}
                mode="outlined"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <HelperText type="error">{errors.email?.message}</HelperText>
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Please enter your password",
              validate: (value) => {
                if (!value.trim()) {
                  return "Please enter your password";
                }

                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }

                if (value.length > 100) {
                  return "Password must be no longer than 100 characters";
                }

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                disabled={isSubmitting}
                mode="outlined"
                label="Password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <HelperText type="error">{errors.password?.message}</HelperText>
        </View>
      </View>

      {onCancel && (
        <Button
          mode="text"
          onPress={onCancel}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Sign up
      </Button>
    </View>
  );
};
