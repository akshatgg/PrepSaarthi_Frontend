import { createReducer } from "@reduxjs/toolkit";

import { serializeError } from "serialize-error";
import {
  signUpStudent,
  logoutUser,
  loadUser,
  loginUser,
  clearError,
  clearMessage,
  getAllConnectionsStu,
  newReview,
  reset,
  getAllReviews,
  deleteReviews,
  updateStudentFinalInfo,
  updatePasswordStudent,
  updateCoverImageStu,
  updateSyllabusTracker,
  getSyllabusTracker,
} from "../action/studentAction";

const initalState = {};
// export const allUsersReducer = createReducer(initalState, (builder) => {
//   builder

//     .addCase(getAllUsers.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(getAllUsers.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         users: action.payload.users,
//         userSigned:action.payload.userSigned
//       };
//     })
//     .addCase(getAllUsers.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });
// export const cartItemReducer = createReducer(initalState, (builder) => {
//   builder

//     .addCase(addItemToCart.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(addItemToCart.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         success: action.payload.success,
//       };
//     })
//     .addCase(addItemToCart.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })

//   // get Cart Item
//     .addCase(getCartItem.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(getCartItem.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         cart: action.payload.cart,
//       };
//     })
//     .addCase(getCartItem.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         success: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });

// export const updateRoleReducer = createReducer(initalState, (builder) => {
//   builder
//     .addCase(updateUser.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(updateUser.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     })
//     .addCase(updateUser.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });
// export const deleteUserReducer = createReducer(initalState, (builder) => {
//   builder

//     .addCase(deleteUser.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(deleteUser.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload.sucess,
//         message: action.payload.message,
//       };
//     })
//     .addCase(deleteUser.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });

export const studentSignup = createReducer(initalState, (builder) => {
  builder
    //Signup
    .addCase(signUpStudent.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(signUpStudent.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: serializeError(action.payload),
      };
    })
    .addCase(signUpStudent.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: serializeError(action.payload),
      };
    })

    //Logout
    .addCase(logoutUser.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      return {
        loading: false,
        message: action.payload.message,
        isAuthenticated: false,
      };
    })
    .addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: serializeError(action.payload.message),
      };
    })
    //login
    .addCase(loginUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        loginMessage: "Logged In",
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loginMessage: null,
        message: null,
      };
    })
    .addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    })
    .addCase(loadUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loadUser.rejected, (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const allStuMentorshipReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllConnectionsStu.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllConnectionsStu.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        connection: action.payload,
      };
    })
    .addCase(getAllConnectionsStu.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const newReviewReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(newReview.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(newReview.fulfilled, (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    })
    .addCase(newReview.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const reviewReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllReviews.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllReviews.fulfilled, (state, action) => {
      return {
        loading: false,
        reviews: action.payload,
      };
    })
    .addCase(getAllReviews.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const changeCoverReducerStu = createReducer(initalState, (builder) => {
  builder

    .addCase(updateCoverImageStu.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateCoverImageStu.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(updateCoverImageStu.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const deleteReviewReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(deleteReviews.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteReviews.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(deleteReviews.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const updateStudentPassword = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(updatePasswordStudent.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updatePasswordStudent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          status:'success'
        };
      })
      .addCase(updatePasswordStudent.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearMessage.fulfilled, (state, action) => {
        return {
          ...state,
          status: {},
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);

export const updateStudent = createReducer(initalState, (builder) => {
  builder

    .addCase(updateStudentFinalInfo.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateStudentFinalInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(updateStudentFinalInfo.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        user: {},
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const syllabusTrackerEditor = createReducer(initalState, (builder) => {
  builder
    .addCase(updateSyllabusTracker.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateSyllabusTracker.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        message:action.payload.syllabusProgress.progress
      };
    })
    .addCase(updateSyllabusTracker.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    })
    // .addCase(reset.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     notificatioin:[],
    //   };
    // });
});
export const syllabusGetter = createReducer(initalState, (builder) => {
  builder
    .addCase(getSyllabusTracker.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getSyllabusTracker.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        message:action.payload.message
      };
    })
    .addCase(getSyllabusTracker.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    })
    // .addCase(reset.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     notificatioin:[],
    //   };
    // });
});
// export const mentorDetailsReducer = createReducer(initalState, (builder) => {
//     builder

//       .addCase(getUserDetails.pending, (state, action) => {
//         return {
//           ...state,
//           loading: true,
//         };
//       })
//       .addCase(getUserDetails.fulfilled, (state, action) => {
//         return {
//           ...state,
//           loading: false,
//           user: action.payload,
//         };
//       })
//       .addCase(getUserDetails.rejected, (state, action) => {
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       })
//       .addCase(clearError.fulfilled, (state, action) => {
//         return {
//           ...state,
//           error: null,
//         };
//       });
//   });

// export const updateMentorFinalReducer = createReducer(initalState, (builder) => {
//     builder

//       .addCase(updateMentorFinalInfo.pending, (state, action) => {
//         return {
//           ...state,
//           loading: true,
//         };
//       })
//       .addCase(updateMentorFinalInfo.fulfilled, (state, action) => {
//         return {
//           ...state,
//           loading: false,
//           user: action.payload,
//         };
//       })
//       .addCase(updateMentorFinalInfo.rejected, (state, action) => {
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       })
//       .addCase(clearMessage.fulfilled, (state, action) => {
//         return {
//           ...state,
//           user:{}
//         };
//       })
//       .addCase(clearError.fulfilled, (state, action) => {
//         return {
//           ...state,
//           error: null,
//         };
//       });
//   });
