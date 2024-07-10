import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { usersConfig } from "../../utils/config";
import NoUserSelected from "../fingerprint-verification/NoUserSelected";
import { useEffect, useState } from "react";
import DigitalSigntureInput from "../DigitalSigntureInput";
import FingerPrintComponent from "../FingerPrintComponent";
import { useForm } from "react-hook-form";
import NoSigntureNotesInput from "../NoSigntureNotesInput";
import AbsenceNotesInput from "../AbsenceNotesInput";

interface Props {
  selectedUser: string;
  setSelectedUser: (item: any) => void;
}

export default function Authorize({ selectedUser, setSelectedUser }: Props) {
  const {
    control,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({});
  const [authType, setAuthType] = useState("signature");
  const [signature, setSignature] = useState<any>("");

  let renderedAuthType;
  switch (authType) {
    case "signature":
      renderedAuthType = (
        <DigitalSigntureInput signture={signature} setSignture={setSignature} />
      );
      break;
    case "fingerprint":
      renderedAuthType = <FingerPrintComponent control={control} />;
      break;
    case "rejectsignature":
      renderedAuthType = <NoSigntureNotesInput control={control} />;
      break;
    case "absence":
      renderedAuthType = <AbsenceNotesInput control={control} />;
      break;
    default:
      renderedAuthType = null;
  }

  const onReset = () => {
    setValue("absenceNotes", "");
    setValue("noSigntureNotes", "");
    reset();
    setAuthType(authType);
    if (signature) {
      signature.clear();
    }
  };

  useEffect(() => {
    onReset();
  }, [authType]);

  return (
    <div style={{ marginBlock: "24px 10px" }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "400",
          color: "#363841",
          mb: "8px",
        }}
      >
        مصادقة
      </Typography>
      <Box sx={{ backgroundColor: "#fff", p: "24px", borderRadius: "4px" }}>
        <div>
          <Box sx={{ display: "flex", gap: "12px" }}>
            {usersConfig.map((item: string, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: "8px 20px",
                    backgroundColor:
                      selectedUser === item ? "#077C5A" : "#F5F8FA",
                    color: selectedUser === item ? "#fff" : "#617696",
                    fontSize: "12px",
                    fontWeight: "400",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectedUser(item)}
                >
                  {item}
                </Box>
              );
            })}
          </Box>
        </div>

        {!selectedUser && <NoUserSelected />}

        {selectedUser && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "20px",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
              }}
            >
              <RadioGroup
                name={"authType"}
                onChange={(e) => setAuthType(e.target.value)}
                value={authType}
                sx={{ flexDirection: "row", columnGap: "70px", rowGap: "20px" }}
              >
                <FormControlLabel
                  sx={{
                    m: "0px",
                    color: "#617696",
                    "& .MuiTypography-root": {
                      fontSize: "14px !important",
                    },
                  }}
                  value="signature"
                  control={<Radio />}
                  label="توقيع حي على الشاشة"
                />

                <FormControlLabel
                  sx={{
                    m: "0px",
                    color: "#617696",
                    "& .MuiTypography-root": {
                      fontSize: "14px !important",
                    },
                  }}
                  value="fingerprint"
                  control={<Radio />}
                  label="البصمة"
                />

                <FormControlLabel
                  sx={{
                    m: "0px",
                    color: "#617696",
                    "& .MuiTypography-root": {
                      fontSize: "14px !important",
                    },
                  }}
                  value="rejectsignature"
                  control={<Radio />}
                  label="رفض التوقيع"
                />

                <FormControlLabel
                  sx={{
                    m: "0px",
                    color: "#617696",
                    "& .MuiTypography-root": {
                      fontSize: "14px !important",
                    },
                  }}
                  value="absence"
                  control={<Radio />}
                  label="لم يحضر"
                />
              </RadioGroup>

              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography
                    sx={{
                      color: "#617696",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    رقم الهوية:
                  </Typography>
                  <Typography
                    sx={{ color: "#000", fontSize: "14px", fontWeight: "400" }}
                  >
                    1005487961
                  </Typography>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography
                    sx={{
                      color: "#617696",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    الصفة:
                  </Typography>
                  <Typography
                    sx={{ color: "#000", fontSize: "14px", fontWeight: "400" }}
                  >
                    مدعي عليه
                  </Typography>
                </div>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "70vh",
                border: "0.8px solid #858B941A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                paddingTop: "55px",
                pb: "80px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Button
                  sx={{ p: "8px 30px 8px 30px", borderRadius: "30px" }}
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                >
                  تأكيد
                </Button>

                <IconButton
                  onClick={onReset}
                  sx={{
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 14px 0px #00000021",
                    color: "#000",
                  }}
                >
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      d="M19.9239 8.617C19.8481 8.43431 19.7199 8.27819 19.5554 8.16837C19.391 8.05854 19.1976 7.99995 18.9999 8H17.9409C17.7478 6.27324 17.059 4.63927 15.9577 3.29537C14.8564 1.95147 13.3896 0.955098 11.7344 0.426537C10.0792 -0.102023 8.30646 -0.140169 6.63008 0.316704C4.9537 0.773578 3.4454 1.70594 2.28729 3.00122C1.12918 4.2965 0.370765 5.89933 0.103609 7.61619C-0.163547 9.33305 0.0719787 11.0905 0.781751 12.6765C1.49152 14.2624 2.6452 15.609 4.10349 16.5536C5.56178 17.4983 7.26234 18.0006 8.99986 18C9.26508 18 9.51943 17.8946 9.70697 17.7071C9.8945 17.5196 9.99986 17.2652 9.99986 17C9.99986 16.7348 9.8945 16.4804 9.70697 16.2929C9.51943 16.1054 9.26508 16 8.99986 16C7.65774 16.0016 6.34347 15.6173 5.21361 14.8929C4.08376 14.1685 3.18597 13.1346 2.62719 11.9144C2.06842 10.6941 1.87222 9.33894 2.06197 8.0103C2.25173 6.68167 2.81944 5.43559 3.69747 4.42053C4.57549 3.40547 5.72682 2.66422 7.01428 2.2851C8.30173 1.90597 9.67104 1.90496 10.9591 2.28217C12.2471 2.65938 13.3995 3.39891 14.279 4.41267C15.1586 5.42642 15.7281 6.67165 15.9199 8H14.9999C14.8021 8.00004 14.6088 8.05871 14.4444 8.1686C14.28 8.27848 14.1519 8.43465 14.0762 8.61735C14.0005 8.80005 13.9807 9.00108 14.0193 9.19503C14.0578 9.38898 14.153 9.56715 14.2929 9.707L16.2929 11.707C16.4804 11.8945 16.7347 11.9998 16.9999 11.9998C17.265 11.9998 17.5193 11.8945 17.7069 11.707L19.7069 9.707C19.8468 9.56715 19.9421 9.38895 19.9807 9.19492C20.0194 9.0009 19.9996 8.79977 19.9239 8.617Z"
                      fill="black"
                    />
                  </svg>
                </IconButton>
              </Box>
              {renderedAuthType}

              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  p: "8px 16px 8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #067C5A",
                  background: "#fff",
                }}
              >
                <Typography sx={{ color: "#067C5A", fontWeight: "700" }}>
                  محمد عبدالله احمد الدوسري
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
