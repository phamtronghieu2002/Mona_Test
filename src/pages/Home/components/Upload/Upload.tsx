import { FC } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface UploadProps {}

const Upload: FC<UploadProps> = () => {
  const [files, setFiles] = useState<any>([]);
  const [field1, setField1] = useState<string>("");
  const [field2, setField2] = useState<string>("");
  const [field3, setField3] = useState<string>("");

  // Assuming you have the image URL
  const imageUrl =
    "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1715960775/1715960770632.jpg";

  useEffect(() => {
    //init the filepond
    if (imageUrl) {
      setFiles([
        {
          source: imageUrl,
          options: {
            type: "local",
          },
        },
      ]);
    }
  }, [imageUrl]);

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("files", file.file);
    });
    formData.append("field1", field1);
    formData.append("field2", field2);
    formData.append("field3", field3);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={field1}
        onChange={(e) => setField1(e.target.value)}
        placeholder="Field 1"
      />
      <input
        type="text"
        value={field2}
        onChange={(e) => setField2(e.target.value)}
        placeholder="Field 2"
      />
      <input
        type="text"
        value={field3}
        onChange={(e) => setField3(e.target.value)}
        placeholder="Field 3"
      />

      <FilePond
        server={{
          load: (source, load, error, progress, abort, headers) => {
            var myRequest = new Request(source);
            fetch(myRequest).then(function (response) {
              response.blob().then(function (myBlob) {
                load(myBlob);
              });
            });
          },
        }}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Upload;
