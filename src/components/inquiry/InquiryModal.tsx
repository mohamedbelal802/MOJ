import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import CloseBtn from "../ui/buttons/CloseBtn";
import { FILE_PROPS, INQUIRY_TABLE_PROPS } from "../../utils/types";
import { convertToHijri } from "../../utils/funcations";
import { requestType } from "../../utils/config";
import InquiryFileDownload from "./InquiryFileDownload";

export default function InquiryModal({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: any;
}) {
  const fileList = data.files.map((item: FILE_PROPS) => (
    <Grid key={item.fileSharepointId} item xs={6}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "12px",
          border: "0.6px solid #00000017",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img
            src={require("../../assets/fileIcon2.png")}
            style={{ width: "40px", aspectRatio: "1/1", objectFit: "contain" }}
          />

          <div>
            <Typography sx={{ fontWeight: "500", color: "#292D32" }}>
              {item.fileName}
            </Typography>
            {/* <Typography sx={{ fontSize: "14px", color: "#A9ACB4" }}>
              {item.size}
            </Typography> */}
          </div>
        </Box>

        <InquiryFileDownload item={item} />
      </Box>
    </Grid>
  ));
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xl"}
      open={true}
      PaperProps={{
        sx: {
          backgroundColor: "#F8F9FB",
          width: { xs: "calc(100% - 10px)", md: "calc(100% - 64px)" },
          marginX: { xs: "0px", md: "32px" },
          height: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <CloseBtn onClick={closeModal} />
      </DialogTitle>

      <DialogContent sx={{ px: "50px" }} className="style_scroll_bar">
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#363841",
            mb: "8px",
          }}
        >
          مقدم الطلب
        </Typography>
        <Box
          sx={{
            p: "20px",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{data.name}</Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ backgroundColor: "1px solid #858B941A", my: "0px" }}
          />
          <Typography>{data.job}</Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ backgroundColor: "1px solid #858B941A", my: "0px" }}
          />
          <Typography>{requestType[data.requestType]}</Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ backgroundColor: "1px solid #858B941A", my: "0px" }}
          />
          <Typography>{convertToHijri(data.date)}</Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#363841",
            mb: "8px",
            mt: "20px",
          }}
        >
          الملفات
        </Typography>

        <Box
          sx={{
            p: "40px",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              border: "1px dashed #0000001F",
              p: "20px",
              backgroundColor: "#FBFBFB",
              borderRadius: "20px0",
            }}
          >
            <Grid container spacing={2}>
              {fileList}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
