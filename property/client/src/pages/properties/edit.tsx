import { useState, useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "../../components/common/Form";

export const PropertyEdit: React.FC = () => {

    const user_data = localStorage.getItem('user-auth');
    const { user } = user_data ? JSON.parse(user_data) : null;

    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
    } = useForm();

    const [propertyImage, setPropertyImage] = useState(() => {
        const initialImage = queryResult?.data?.data?.photo;
        return initialImage
            ? { name: "Photo", url: initialImage }
            : { name: "", url: "" };
    });

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setPropertyImage({ name: file?.name, url: result }),
        );
    };

    useEffect(() => {
        if (!propertyImage.url && queryResult?.data?.data?.photo) {
            setPropertyImage({ name: "Photo", url: queryResult.data.data.photo });
        }
    }, [queryResult]);

    const onFinishHandler = async (data: FieldValues) => {
        if (!propertyImage.name) return alert("Please upload a property image");

        await onFinish({
            ...data,
            photo: propertyImage.url,
            email: user?.email,
        });
    };

    // useEffect(() => {
    //     if (!imageSet && queryResult?.data?.data?.photo) {
    //         setPropertyImage({
    //             name: "Photo", // You can set any default name here or use the actual image name if available
    //             url: queryResult.data.data.photo
    //         });
    //         setImageSet(true);
    //     }
    // }, [queryResult, imageSet]);

    return (
        <Form
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            propertyImage={propertyImage}
        />
    );
};