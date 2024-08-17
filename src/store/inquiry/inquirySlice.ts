import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FILE_PROPS {
  name: string;
  url: string;
  size: string;
}

interface TABLE_PROPS {
  name: string;
  status: string;
  requestType: string;
  requestDate: string;
  files: Array<FILE_PROPS>;
}

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    year: string;
    name: string;
    status: string;
    tableData: Array<TABLE_PROPS>;
  };
  status: "idle" | "pending" | "success" | "error";
  errMsg: "";
}

const initialState: INITIAL_STATE_PROPS = {
  data: {
    caseNumber: "",
    year: "",
    name: "",
    status: "",
    tableData: [],
  },
  status: "idle",
  errMsg: "",
};

const person = {
  name: "عبدالرحمن عامر العتيبي",
  status: "قاضي",
  tableData: [
    {
      name: "خالد محمد محمود عبد السلام",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [
        { name: "ملف-١ ", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٢", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٣", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٤", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٥", size: "94 كيلو بايت", url: "" },
      ],
    },
    {
      name: "إبراهيم نور الدين محمد عماد",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
    },
    {
      name: "يوسف عبدالله محمد البرهامي",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
    },
    {
      name: "إسماعيل محمد احمد ابراهيم",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
    },
  ],
};

export const getCaseDetails = createAsyncThunk(
  "/caseDetails",
  async (
    { data }: { data: { caseNumber: string; year: string } },
    thunkApi
  ) => {
    try {
      let response = { data: {} };
      if (data.caseNumber === "452460" && data.year === "1445") {
        response.data = { ...data, ...person };
      } else {
        throw new Error(
          "لا يوجد نتائج بحث من فضلك تحقق من رقم القضية، رقم الجلسه، أو التاريخ"
        );
      }
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const inquirySlice = createSlice({
  name: "inquirySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCaseDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCaseDetails.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getCaseDetails.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default inquirySlice.reducer;