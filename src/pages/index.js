import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import Header from "components/Header.component";
import ActionShareIcons from "components/ActionShareIcons.component";
import { useRef, useState } from "react";
import FBEnlarge from "components/FBEnlarge.component";
import InstaEnlarge from "components/InstaEnlarge.component";
import PintrestEnlarge from "components/PintrestEnlarge.component";
import TwitterEnlarge from "components/TwitterEnlarge.component";
import axios from "axios";
import SkeltonLoaderCard from "components/SkeltonLoaderCard.component";
import DashboardLayout from "components/Layout/Dashboard/DashboardLayout";
import { useMutation } from "react-query";
import { generate } from "queryhook/generate";
import { LocalStorage } from "services/localStorage";
import classNames from "classnames";
import Prompt from "components/Prompt/Prompt";
import Result from "components/Result/Result";

const icons = [
  {
    name: "fa-facebook",
    key: "facebook",
  },
  {
    name: "fa-square-twitter",
    key: "twitter",
  },
  {
    name: "fa-instagram",
    key: "instagram",
  },
  {
    name: "fa-pinterest",
    key: "pinterest",
  },
];

export default function Home() {
  const [imageForEnlargeViewMode, setImageForEnlargeViewMode] = useState(null);
  const [imageEnlargeViewOption, setImageEnlargeViewOption] =
    useState("instagram");
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageForView, setImageForView] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegative_prompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageResponse, setImageResponse] = useState(null);
  const [socialContent, setSocialContent] = useState(null);
  const [activeTab, setTab] = useState(0);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageForView(URL.createObjectURL(e.target.files[0]));
    } else if (e.dataTransfer && e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...e.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          setImage(file);
          setImageForView(URL.createObjectURL(file));
        }
      });
    } else if (e.dataTransfer && e.dataTransfer.files) {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach((file, i) => {
        setImage(file);
        setImageForView(URL.createObjectURL(file));
      });
    }
  };

  const generateMutation = useMutation((data) => generate(data));

  const getSocialMediaContent = async () => {
    const socialPlatform = ["Instagram", "Facebook", "Pinterest", "Twitter"]; //TikTok
    const requests = socialPlatform.map((platform) =>
      axios.post(
        `https://content-generator-api-hvrhzwzgoa-uc.a.run.app/content/generate`,
        {
          type: "social",
          social_platform: platform,
          variations: 1,
          text: prompt,
        },
        {
          headers: {
            "x-api-key": "70e1571f30ad402e94c3ff8c4d49ff07",
          },
        }
      )
    );
    try {
      const responses = await axios.all(requests);
      const data = [];
      responses.forEach((resp) => {
        data.push(resp.data);
      });
      console.log("data", data);
      setSocialContent(data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateImage = async () => {
    const data = new FormData();
    if (image && image.name && prompt) {
      setImageResponse(null);
      setLoading(true);
      setImageForEnlargeViewMode(null);
      await getSocialMediaContent();
      data.append("prompt", prompt);
      data.append("negative_prompt", negative_prompt);
      data.append("super_resolution", "");
      data.append("image", image, image.name);
      //   console.log(LocalStorage.getItem());
      // const response = generateMutation.mutate(data)
      const response = await axios.post(
        "https://image-gen-v2-hvrhzwzgoa-uc.a.run.app/image-gen/predict-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: LocalStorage.getItem(),
          },
        }
      );
      setLoading(false);
      if (response && response.data && response.data.data) {
        setImageResponse(response.data.data);
      }
      console.log("response", response.data.data.input_image_url);
    }
  };

  const TabContainer = ({ children }) => {
    return (
      <ul className={classNames(styles.tabContainer, "nav nav-tabs")}>
        {children}
      </ul>
    );
  };

  const Tab = (props) => {
    const { value, label, index, onClick } = props;
    return (
      <li class={classNames(styles.Tab, "nav-item")}>
        <button
          onClick={onClick}
          className={classNames("blue", styles.navLink, {
            [`${styles["active"]}`]: value === index,
          })}
        >
          {label}
        </button>
      </li>
    );
  };

  const TabContent = ({ children }) => {
    return <div class="tab-content">{children}</div>;
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div
        className={classNames("tab-pane fade show", {
          active: value === index,
        })}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-6"></div>
        <div className="col-sm-12 col-md-6">
          <TabContainer>
            <Tab
              value={activeTab}
              index={0}
              label="Prompts"
              onClick={() => setTab(0)}
            />
            <Tab
              value={activeTab}
              index={1}
              label="Results"
              onClick={() => setTab(1)}
            />
          </TabContainer>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-sm-12 col-md-6">
          {imageForView ? (
            <div className="position-relative rounded-5 main-image-container">
              <img
                src={imageForView}
                className="img img-responsive rounded-5"
                alt="image"
              />
              <div
                className="top-0 cursor-pointer position-absolute end-0"
                onClick={() => {
                  setImageForView(null);
                  setImage(null);
                  setImageResponse(null);
                  setPrompt("");
                  setNegative_prompt("");
                  setSocialContent(null);
                  setImageForEnlargeViewMode(null);
                  setLoading(false);
                }}
              >
                <i className="fa-solid fa-2xl fa-circle-xmark"></i>
              </div>
            </div>
          ) : (
            <div
              className={styles.imageDragDropContainer}
              onDrop={onFileChange}
              onDragOver={dragOverHandler}
            >
              <p
                onClick={() => inputFileRef.current.click()}
                className="cursor-pointer"
              >
                Drag and Drop your Image Here.. <br />
                or <br />
                Click here to Upload*
              </p>
              <input
                type="file"
                onChange={onFileChange}
                ref={inputFileRef}
                name="files"
                id="file"
                className="d-none"
                accept="image/*"
              />
            </div>
          )}
        </div>
        <div className="col-sm-12 col-md-6">
          <TabContent>
            <TabPanel value={activeTab} index={0}>
              <Prompt />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Result />
            </TabPanel>
          </TabContent>
        </div>
      </div>
    </>
  );
}
Home.getLayout = (page) => {
  return <DashboardLayout pageTitle="Account">{page}</DashboardLayout>;
};
