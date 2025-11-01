import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


// ==========================================register user===========================================
export const registerUser = createAsyncThunk(
  'BlogMob/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/register', userData)
      if (res.data.message) {
        alert('user register successfully')
      }

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Sign up failed')
    }
  }
)

// ===============================================login User========================================
export const loginUser = createAsyncThunk(
  "BlogMob/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://10.140.25.102:8000/api/v1/users/login",
        userData
      );


      console.log("✅ Backend Response:", res.data);

      const token = res.data?.data?.token;
      if (!token) {
        return rejectWithValue("No token received from backend");
      }

      // Save token in AsyncStorage
      await AsyncStorage.setItem("accessToken", token);
      console.log("✅ Token saved successfully");

      return res.data; // ✅ returns { status, data: { user, token } }
    } catch (error) {
      console.log("❌ Login Error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);




// ======================================fetchUserData===========================================
export const fetchUsersData = createAsyncThunk(
  "BlogMob/fetchUsersData",
  async (_, { rejectWithValue }) => {
    try {

      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.log("❌ No token found in storage");
        return rejectWithValue("No token found");
      }

      const res = await axios.get(
        "http://10.140.25.102:8000/api/v1/users/current-user-allUserBlog", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      );

      return res.data; // user aur blog dono return
    } catch (err) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);


// ==========================================logOut User =====================================


export const logOut = createAsyncThunk(
  "BlogMob/logOut",
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get(`http://10.140.25.102:8000/api/v1/users/logout`);
      await AsyncStorage.removeItem("accessToken");
      console.log("✅ User logged out and token removed");
      return res.data;
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue("Logout failed");
    }
  }
);



// ====================================add-blog===============================================


export const newAddBlog = createAsyncThunk(
  'BlogMob/addBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (!accessToken) {
        console.log("❌ No token found")
        return rejectWithValue("No token found")
      }

      const res = await axios.post(
        'http://10.140.25.102:8000/api/v1/users/uploadBlog',
        blogData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      )

      console.log('✅ Blog added successfully:', res.data)
      return res.data // ✅ ensure data is returned
    } catch (error) {
      console.log("❌ Blog Add Error:", error.response?.data || error)
      return rejectWithValue(error.response?.data?.message || 'Add blog failed')
    }
  }
)


// ======================= like blog =========================================

export const likeBlog = createAsyncThunk(
  'BlogMob/likeBlog',
  async (blogId, { rejectWithValue }) => {
    console.log('this is blog id in redux thunk like blog ', blogId)
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (!accessToken) {
        console.log("❌ No token found")
        return rejectWithValue("No token found")
      }


      const res = await axios.post('http://10.140.25.102:8000/api/v1/users/like-blog', { blogId },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      return res.data
    } catch (error) {
      console.log("❌ Like Blog Error:", error.response?.data || error)
    }
  }
)


// =================================bookmark blog========================================

export const bookmarkedBlog = createAsyncThunk(
  'BlogMob/bookmarkBlog',
  async (blogId, { rejectWithValue }) => {
    console.log('redux==========> ', blogId)
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (!accessToken) {
        console.log("❌ No token found")
        return rejectWithValue("No token found")
      }

      const res = await axios.post('http://10.140.25.102:8000/api/v1/users/bookmark-blog', { blogId },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true
          }
        }
      )
      return res.data
    } catch (error) {
      console.log("❌ Bookmark Blog Error:", error.response?.data || error)
    }
  }
)


// ==================================delete blog========================================



// =================================updateProfleDetails========================================





const initialState = {
  userDetails: null,    // ✅ {} || null always becomes {}, so just use null
  allUsersBlogs: [],     // ✅ [] || null always becomes [], so just use []
  isLoading: false,
  successMessage: null,
  error: null,
  token: null
}

const blogSlice = createSlice({
  name: "BlogMob",
  initialState,
  reducers: {
    addBlog: (state, action) => {   // ❌ async removed — reducers must be sync
      // your logic here
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.userDetails = action.payload.data.data; // ✅ backend returns user in `data`
      state.successMessage = action.payload.message; // "user created successfully"
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.error = action.payload; // error message from rejectWithValue
    })


      //================================= login is here=======================

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload?.data?.user || null;
        state.token = action.payload?.data?.token || null;
        state.successMessage = "Login successful";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });


    //==================== fatch allUsersBlogs====================================

    builder.addCase(fetchUsersData.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload.data.user;
      state.allUsersBlogs = action.payload.data.allUserBlog || [];
    })
    builder.addCase(fetchUsersData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });


    // ======================logOut user===============================================


    builder.addCase(logOut.fulfilled, (state) => {
      state.userDetails = null;
      state.allUsersBlogs = [];
      state.token = null;
      state.successMessage = "User logged out successfully";
    });



    // ======================add blog===============================================

    builder.addCase(newAddBlog.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(newAddBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsersBlogs.push(action.payload.data);
    })

    builder.addCase(newAddBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })



    // ====================== like blog===============================================

    builder.addCase(likeBlog.pending, (state, action) => {
      state.isLoading = true;

    })

    builder.addCase(likeBlog.fulfilled, (state, action) => {
      state.isLoading = false;

      const updatedBlog = action.payload.data;
      console.log('this is your palyload like blog ', updatedBlog)

      // Update the specific blog in allUsersBlogs
      state.allUsersBlogs = state.allUsersBlogs.map(blog =>
        blog._id === updatedBlog._id ? { ...updatedBlog, likes: updatedBlog.likes } : blog
      );
    })

    builder.addCase(likeBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    // ====================== bookmark blog===============================================
    builder.addCase(bookmarkedBlog.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(bookmarkedBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedBlog = action.payload.data;
      state.userDetails = { ...state.userDetails, bookmarkedPost: updatedBlog.bookmarkedPost }
    })

    builder.addCase(bookmarkedBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    // ====================== delete blog===============================================

    builder.addCase(deleteBlog.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(deleteBlog.fulfilled, (state, action) => {

      state.isLoading = false;
      const deletedBlogId = action.payload.blogId;
      state.allUsersBlogs = action.payload.data
    })

    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

  }
})


// =======================================

export const { addBlog } = blogSlice.actions
export default blogSlice.reducer
