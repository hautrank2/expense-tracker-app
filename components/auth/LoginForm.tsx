import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export type LoginFormProps = {
  defaultValues?: Partial<LoginValues>;
  afterSuccess?: (values: LoginValues) => void | Promise<void>;
  onCancel?: () => void;
};

export type LoginValues = {
  email: string;
  password: string;
};

export const LoginForm = ({
  defaultValues,
  afterSuccess,
  onCancel,
}: LoginFormProps) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginValues>({
    mode: "onChange",
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await afterSuccess?.({
        email: values.email.trim(),
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
            name="email"
            rules={{
              required: "Please enter your email",
              validate: (value) => {
                const trimmed = value.trim();

                if (!trimmed) {
                  return "Please enter your email";
                }

                if (trimmed.length < 3) {
                  return "email must be at least 3 characters";
                }

                if (trimmed.length > 50) {
                  return "email must be no longer than 50 characters";
                }

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                disabled={isSubmitting}
                mode="outlined"
                label="Email"
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

      <View>
        <Pressable
          onPress={() => {
            router.push("/sign-up");
          }}
        >
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Create a new account
          </Text>
        </Pressable>
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
