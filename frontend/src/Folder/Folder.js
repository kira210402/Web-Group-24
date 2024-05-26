import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useParams } from 'react-router-dom';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Folder(User) {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [customSelectActive, setCustomSelectActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("latest");
  const [selectedValueBrown, setSelectedValueBrown] = useState("latest");

  useEffect(() => {
    gsap.to(".myElement", {
      scrollTrigger: {
        trigger: ".myElement",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
      x: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".myElement",
        start: "top center",
        toggleActions: "play none none none",
      },
    });
    tl.to(".myElement", { x: 100 });

    return () => {

      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const cnavigationDropdown = useRef(null);
  const [status, setStatus] = useState(false);
  const tl = useRef(
    gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.6,
        ease: "power4.inOut",
      },
    })
  );

  useEffect(() => {
    // Set up the GSAP animation timeline
    tl.current.to(".cnavigation__dropdown-list", {
      clipPath: "polygon(0 0, 100% 0,100% 100%, 0 100% )",
    });
  }, []);

  const toggleDropdown = () => {
    if (!status) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
    setStatus(!status);
  };
  const handleDropdownClick = () => {
    setDropdownStatus(!dropdownStatus);
  };


  const handleSelectClick = () => {
    setCustomSelectActive(!customSelectActive);
  };

  const handleOptionClick = (event) => {
    setSelectedValue(event.currentTarget.querySelector("label").textContent);
    setCustomSelectActive(false);
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { folderId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("No token or userId found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/folders/${folderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-ID": userId,
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [folderId, navigate]);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="cfirst">
        <div className="cfirst__heading">
          <div className="cfirst__title">
            <h1>My Folder</h1>
            <svg
              className="cfirst__paw"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 120"
            >
              <path
                fill="#FBCF26"
                d="M66.335 28.138v7.4h7.4l-7.4-7.4zM92.232 35.456a1.92 1.92 0 0 1 .039 2.668l-2.709-2.707c.37-.349.83-.523 1.309-.525a1.92 1.92 0 0 1 1.361.564zM74.078 93.039H36.09a9.746 9.746 0 0 1-7.67-3.75h53.328a9.746 9.746 0 0 1-7.67 3.75zM41.002 33.539h16.499c.827 0 1.501-.671 1.501-1.499 0-.829-.674-1.5-1.501-1.5H41.002a1.5 1.5 0 1 0 0 2.999zm16.499 2.001H41.002a1.5 1.5 0 1 0 0 3h16.499c.827 0 1.501-.672 1.501-1.501 0-.827-.674-1.499-1.501-1.499zm0 5h-4.032a1.5 1.5 0 0 0 0 3.001h4.032a1.501 1.501 0 0 0 0-3.001z"
              />
              <path
                fill="#1A2559"
                d="M95.792 36.816a4.919 4.919 0 0 0-4.92-4.921 4.89 4.89 0 0 0-3.482 1.444l-8.555 8.555v-5.501L65.479 23.04H31.833v18.216c-4.948 1.755-8.498 6.462-8.5 12.013l.002 30.015c0 7.045 5.71 12.755 12.755 12.757h37.988c7.045-.002 12.755-5.712 12.758-12.757V61.376a10.538 10.538 0 0 0-4.756-8.808l12.272-12.273a4.917 4.917 0 0 0 1.44-3.479zm-3.56-1.36a1.92 1.92 0 0 1 .039 2.668l-2.709-2.707c.37-.349.83-.523 1.309-.525a1.92 1.92 0 0 1 1.361.564zm-25.897-7.318 7.4 7.4h-7.4v-7.4zm-31.5-2.1h28.499v12.5h12.498l.002 6.355-5.937 5.937h-17.22a302.26 302.26 0 0 1-2.826-5.13c-.708-1.299-1.373-2.633-2.725-3.672-1.36-1.037-3.195-1.521-5.759-1.517H36.09c-.424 0-.842.024-1.255.063V26.038zm39.243 67.001H36.09a9.746 9.746 0 0 1-7.67-3.75h53.328a9.746 9.746 0 0 1-7.67 3.75zm9.755-31.663v21.907a9.802 9.802 0 0 1-.481 3.008H26.834l-.018.002a9.72 9.72 0 0 1-.482-3.01V53.269c.01-5.387 4.369-9.748 9.756-9.756h5.277c2.242.004 3.279.401 3.942.904.676.498 1.187 1.361 1.896 2.703a342.837 342.837 0 0 0 3.29 5.948l.429.763h25.364a7.553 7.553 0 0 1 7.545 7.545zM76.289 50.83h-2.146l13.295-13.297 2.717 2.718-10.989 10.988a10.542 10.542 0 0 0-2.877-.409z"
              />
            </svg>
          </div>
          <Link to={`/profile`}>
          <svg
            className="cfirst__back"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <style>
              {`
                                .st0 {
                                    display: none;
                                }
                                .st1 {
                                    display: inline;
                                }
                            `}
            </style>
            <g id="_x34__1_">
              <path
                d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z"
                id="icon_35_"
              />
            </g>
          </svg>
          </Link>
        </div>
        <div className="cfirst__filter">
          <div className="cform__month">
            <button
              className="cform__month--button"
              role="combobox"
              aria-labelledby="select button"
              aria-haspopup="listbox"
              aria-expanded={customSelectActive ? "true" : "false"}
              aria-controls="select-dropdown"
              onClick={handleSelectClick}
            >
              <span className="cform__month--selected-value">
                {selectedValue}
              </span>
              <Link to={`/profile`}>
              <svg
                width="28"
                className="cform__month--arrow"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z"
                  fill="#734A4A"
                />
              </svg>
              </Link>
            </button>
            <ul
              className={`cform__month--dropdown ${customSelectActive ? "active" : ""
                }`}
              role="listbox"
              id="select-dropdown"
            >
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="jan" name="social-account" />
                <label htmlFor="jan">latest</label>
              </li>
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="feb" name="social-account" />
                <label htmlFor="feb">most used</label>
              </li>
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="mar" name="social-account" />
                <label htmlFor="mar">oldest</label>
              </li>
            </ul>
          </div>
          <svg
            className="cfirst__plus"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            onClick={() => navigate(`create_course`)}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>plus-circle</title>
            <desc>Created with Sketch Beta.</desc>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Icon-Set"
                transform="translate(-464.000000, -1087.000000)"
                fill="#7a4a4a"
              >
                <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <section className="cmain">
        {courses.map((course, i) => (
          <div className="cmain__folder" key={i}>
            <Link to={`/course/${course._id}/`}>
              <svg
                className="cmain__folder-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <defs>
                  <style>
                    {`
                    .cls-2 {
                      fill: #dad7e5;
                    }
                    .cls-6 {
                      fill: #919191;
                    }
                  `}
                  </style>
                </defs>
                <g id="File_and_folder" data-name="File and folder">
                  <path style={{ fill: "#c6c3d8" }} d="M42 1v20h-6V7H12V1h30z" />
                  <path className="cls-2" d="M42 1v18h-9A18 18 0 0 1 15 1h27z" />
                  <path
                    d="M47 23v22a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2h12.93a2 2 0 0 1 1.66.89L21 21h24a2 2 0 0 1 2 2z"
                    style={{ fill: "#fc6" }}
                  />
                  <path
                    d="M47 23v22H34A30.09 30.09 0 0 1 4 15h11.93a2 2 0 0 1 1.66.89L21 21h24a2 2 0 0 1 2 2z"
                    style={{ fill: "#ffde76" }}
                  />
                  <path
                    className="cls-2"
                    d="M36 7v14H21l-3.41-5.11a2 2 0 0 0-1.66-.89H6V7z"
                  />
                  <path
                    d="M36 7v12H23l-3.41-5.11a2 2 0 0 0-1.66-.89H15a6 6 0 0 1-6-6h27z"
                    style={{ fill: "#edebf2" }}
                  />
                  <path
                    className="cls-6"
                    d="M31 13h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2zM31 17h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"
                  />
                </g>
              </svg>
              <span className="cmain__folder-title">{course.title}</span>
            </Link>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Folder;
