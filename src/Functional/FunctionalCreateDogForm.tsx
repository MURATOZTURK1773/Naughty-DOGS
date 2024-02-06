import { useState, ChangeEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog,
}: {
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(defaultSelectedImage);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const newDog: Omit<Dog, "id"> = {
      name,
      image: selectedImage,
      description,
      isFavorite: false,
    };
    createDog(newDog)
      .then(() => {
        setName("");
        setDescription("");
        setSelectedImage(defaultSelectedImage);
        setIsFormSubmitted(false);
        toast.success(`Created ${newDog.name} !!!`);
      })
      .catch((error) => {
        toast.error("Error creating dog:", error);
      });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isFormSubmitted}
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="picture" value={selectedImage} onChange={handleImageChange}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
