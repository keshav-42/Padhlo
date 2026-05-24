"use client";
import { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
} from "@mui/material";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/demo/video/upload/du_3.0,so_2.0/ac_mp3,br_44k/docs/firefly-tune.mp3"
      )
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
      
    }
    if (isSuccess) {
      
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socket.on("newNotification", (data) => {
      
      refetch();
      playNotificationSound();
    });
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <IoMdNotificationsOutline />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 60 * 4.5,
            width: "350px",
          },
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Notifications
        </Typography>
        <Divider />
        {notifications.map((item: any, index: number) => (
          <MenuItem
            key={index}
            onClick={() => handleNotificationStatusChange(item._id)}
          >
            <ListItemText
              primary={item.title}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {item.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {format(item.createdAt)}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleNotificationStatusChange(item._id)}
              >
                <Typography variant="body2">Mark as read</Typography>
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DashboardHeader;
