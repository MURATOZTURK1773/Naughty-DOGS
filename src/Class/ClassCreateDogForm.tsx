import { ChangeEvent, Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";

interface CreateDogProps {
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
}

interface CreateDogState {
  name: string;
  description: string;
  selectedImage: string;
  isFormSubmitted: boolean;
}

export class ClassCreateDogForm extends Component<
  CreateDogProps,
  CreateDogState
> {
  state: CreateDogState = {
    name: "",
    description: "",
    selectedImage: "",
    isFormSubmitted: false,
  };

  handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedImage: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ isFormSubmitted: true });

    const newDog: Omit<Dog, "id"> = {
      name: this.state.name,
      image: this.state.selectedImage,
      description: this.state.description,
      isFavorite: false,
    };
    this.props.createDog(newDog).then(() => {
      this.setState({ name: "", description: "", selectedImage: "" });
      this.setState({ isFormSubmitted: false });
      toast.success(`Created ${newDog.name}`);
    });
  };

  render() {
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={this.state.isFormSubmitted}
          value={this.state.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.setState({ name: e.target.value })
          }
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          disabled={false}
          value={this.state.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            this.setState({ description: e.target.value })
          }
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          value={this.state.selectedImage}
          onChange={this.handleImageChange}
        >
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
  }
}
