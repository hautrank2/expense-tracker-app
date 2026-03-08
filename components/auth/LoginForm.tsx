import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

export type LoginFormProps = {
  defaultValues?: Partial<LoginValues>;
  afterSuccess?: (values: LoginValues) => void | Promise<void>;
  onCancel?: () => void;
};

export type LoginValues = {
  username: string;
  password: string;
};

export const LoginForm = ({
  defaultValues,
  afterSuccess,
  onCancel,
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginValues>({
    mode: "onChange",
    defaultValues: {
      username: defaultValues?.username ?? "",
      password: defaultValues?.password ?? "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await afterSuccess?.({
        username: values.username.trim(),
        password: values.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-col gap-2">
        <View>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Please enter your username",
              validate: (value) => {
                const trimmed = value.trim();

                if (!trimmed) {
                  return "Please enter your username";
                }

                if (trimmed.length < 3) {
                  return "Username must be at least 3 characters";
                }

                if (trimmed.length > 50) {
                  return "Username must be no longer than 50 characters";
                }

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                disabled={isSubmitting}
                mode="outlined"
                label="Username"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <HelperText type="error">{errors.username?.message}</HelperText>
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

      <View className="flex flex-row gap-2 items-center justify-end">
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
          Login
        </Button>
      </View>
    </View>
  );
};
