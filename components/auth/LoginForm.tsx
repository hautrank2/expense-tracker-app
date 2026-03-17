import { auth } from "@/firebase";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import {
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export type LoginFormProps = {
  defaultValues?: Partial<LoginValues>;
  afterSuccess?: (
    result: LoginResult,
    values: LoginValues,
  ) => void | Promise<void>;
  onCancel?: () => void;
};

export type LoginResult = {
  _tokenResponse: {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
  };
  operationType: "signIn" | "signUp" | "link";
  providerId: string | null;
  user: {
    _redirectEventId?: string | null;
    apiKey: string;
    appName: string;
    createdAt: string;
    displayName?: string | null;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: string;
    phoneNumber?: string | null;
    photoURL?: string | null;
    providerData: unknown[];
    stsTokenManager: Record<string, unknown>;
    tenantId?: string | null;
    uid: string;
  };
};

export type LoginValues = {
  email: string;
  password: string;
};

const onLogin = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const raw = res as unknown as LoginResult;
  return raw;
};

export const LoginForm = ({
  defaultValues,
  afterSuccess,
  onCancel,
}: LoginFormProps) => {
  const [snackbar, setSnackbar] = useState<string | null>(null);
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
      const loginRes = await onLogin(values.email, values.password);

      await afterSuccess?.(loginRes, {
        email: values.email.trim(),
        password: values.password,
      });
    } catch (err: unknown) {
      let str = "";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
            str = "Email or password incorrect";
            break;
          default:
            str = "Something wrong";
        }
      }
      setSnackbar(str);
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
        className="mt-2"
      >
        Login
      </Button>
    </View>
  );
};
