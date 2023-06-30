import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../Components/NavBar/LOGO.svg";
import "./EditBio.css";
import AboutUser from "../AboutUser/AboutUser";
import api from "../../api/api";
import storage from "../../config/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is required")
    .required()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Invalid email"
    ),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

interface User {
  Biography: string | null;
  Email: string;
  ProfilePicture: string | null;
  UserID: string;
  Username: string;
}

interface EditBioProps {
  user: User;
}

export default function EditBio({ user }: EditBioProps) {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [message, setMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.Email,
      firstName: user?.Username.split(" ")[0],
      lastName: user?.Username.split(" ")[1],
    },
    mode: "onChange",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as keyof FormData, value);
  };

  const uploadImage = async () => {
    try {
      if (imageFile) {
        const storageRef = ref(
          storage,
          `${user.UserID}/profilePicture/${imageFile.name}`
        );
        const task = await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        setMessage("Success Upload");
      }
    } catch (error) {
      setMessage("Error Upload");
    }
  };

  const onSubmit = (data: FormData) => {
    const updatedData = {
      userName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      profilePicture: imageUrl,
    };
    console.log(updatedData);
    api
      .patch(`/users/${user.UserID}`, updatedData)
      .then((_res) => {
        setMessage("Success Update");
      })
      .catch((_err) => {
        setMessage("Error Update");
      });
  };

  return (
    <div className="edit_profile-container_right">
      {message && <MessagePopUp message={message} setMessage={setMessage} />}
      <h1>Basic information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit_profile-container_right_userinfo">
          <div className="edit_profile-container_right_userinfo_name">
            <div className="edit">
              <img
                src={user?.ProfilePicture ? user?.ProfilePicture : logo}
                alt={user?.Username}
              />
              <input
                className="upload-profile-picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="button" onClick={uploadImage}>
                Upload
              </button>
            </div>
            <div className="edit_profile-container_right_userinfo_name_input">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName")}
                onChange={handleInputChange}
                className="input-large"
                defaultValue={user?.Username.split(" ")[0]}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
                onChange={handleInputChange}
                className="input-large"
                defaultValue={user?.Username.split(" ")[1]}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="edit_profile-container_right_userinfo_email">
            <input
              type="email"
              placeholder="Email"
              defaultValue={user?.Email}
              {...register("email")}
              className="input-large"
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
      <AboutUser user={user} />
    </div>
  );
}
