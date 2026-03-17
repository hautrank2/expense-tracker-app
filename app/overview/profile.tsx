import { useAuthCtx } from "@/store/auth";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";

const ProfileScreen = () => {
  const { payload, onLogout } = useAuthCtx();
  const user = payload?.user;

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch {
      Alert.alert("Error", "Logout failed");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Avatar.Text
            size={72}
            label={(user?.email?.[0] || "U").toUpperCase()}
          />

          <Text variant="headlineSmall" style={styles.title}>
            Profile
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || "-"}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Display name</Text>
            <Text style={styles.value}>{user?.displayName || "-"}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user?.uid || "-"}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Email verified</Text>
            <Text style={styles.value}>
              {user?.emailVerified ? "Yes" : "No"}
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    borderRadius: 16,
  },
  content: {
    alignItems: "center",
    paddingVertical: 24,
  },
  title: {
    marginTop: 16,
    fontWeight: "700",
  },
  divider: {
    width: "100%",
    marginVertical: 20,
  },
  infoBlock: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 16,
    width: "100%",
  },
});
