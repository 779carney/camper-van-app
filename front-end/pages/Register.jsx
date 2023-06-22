import { Text, Button, ScrollView, TextInput, View, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postNewUser } from "../api";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export const Register = () => {
  const [createUser, setCreateUser] = useState(false);
  const [image, setImage] = useState("");

  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      region: "",
      postcode: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      img: "",
    },
  });

  const onSubmit = (data) => {
    data.img = image
    postNewUser(data).then(({ data }) => {
      setCreateUser(true);
    });
  };

   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1
    })

    if (!result.cancelled) {
      const img = result.assets[0].uri;
      console.log(img)

      setImage(img)
      
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      {createUser ? (
        <View>
          <Text>User created successfully!</Text>
          <Button title="Login  now" onPress={() => navigate("Login")} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer} >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="first name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="region"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="region"
          />
          {errors.region && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="postcode"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="postcode"
          />
          {errors.postcode && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="phone number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text style={styles.errorText}>This is required.</Text>}

          <Button title="image upload" label="Upload Image" onPress={() => pickImage()} />
          <Button title="reset-images" label="Reset" onPress={() => setImage("")
          } />
          <Image style={{width: 80, height: 80}} source={{ uri: image}} />

          <Button title="Sign up!" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});