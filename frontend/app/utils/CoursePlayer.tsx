import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`https://serverpadhlo.onrender.com/api/v1/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        console.log(res);
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
{
  /* <div style="padding-top:56%;position:relative;">
<iframe src="https://player.vdocipher.com/v2/?otp=20160313versASE323kYvPaJH0X0dVX3FnoBEYRpHiBR47TA03GXgEa4xjkVqAXz&playbackInfo=eyJ2aWRlb0lkIjoiYzdjYzNlZjYzNTFkNDJkNzhmMmM3NTc3ZDQ0YTUyNmQifQ==" style="border:0;max-width:100%;position:absolute;top:0;left:0;height:100%;width:100%;" allowFullScreen="true" allow="encrypted-media"></iframe>
</div> */
}
