import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import fileIcon from "../../assets/fileIcon.png";
import { useState } from "react";
import InquiryModal from "./InquiryModal";

const columns = ["#", "الاسم", "الصفة", "نوع الطلب", "تاريخ الطلب", "الملفات"];

export default function InquiryTable() {
  const [modalData, setModalData] = useState({ isOpen: false, data: {} });
  const {
    data: { tableData },
  } = useAppSelector((state) => state.inquiry);

  const openFile = (data: any) => {
    setModalData({ isOpen: true, data: data });
  };

  const closeModal = () => setModalData({ isOpen: false, data: {} });
  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Typography sx={{ fontWeight: "600" }}>نتائج البحث</Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: string) => (
                    <TableCell
                      sx={{
                        backgroundColor: "#1D3A39",
                        color: "white",
                        border: "1px solid #DCDCDC",
                        py: "10px",
                      }}
                      align="right"
                      key={column}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item: any, index: number) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        {index}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        {item.requestType}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        {item.requestDate}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DCDCDC" }}
                        align={"right"}
                      >
                        <Button
                          onClick={() => openFile(item)}
                          color="inherit"
                          variant="contained"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "none",
                          }}
                        >
                          <img
                            src={fileIcon}
                            style={{ width: "24px", aspectRatio: "1/1" }}
                          />
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "400" }}
                          >
                            عرض الملفات
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {modalData.isOpen && (
        <InquiryModal data={modalData.data} closeModal={closeModal} />
      )}
    </>
  );
}