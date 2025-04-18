import { createReducer } from "@reduxjs/toolkit";

import {
  clearError,
  getMentorList,
  getMentorRequest,
  getSuccessMentorConnection,
} from "../action/metorListAction";
import { getAllConnections } from "../action/userAction";

const initalState = {};



export const mentorListReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getMentorList.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getMentorList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(getMentorList.rejected, (state, action) => {
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
export const mentorRequestListReducer = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(getMentorRequest.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMentorRequest.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(getMentorRequest.rejected, (state, action) => {
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
  }
);
export const allConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllConnections.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllConnections.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        connection: action.payload,
      };
    })
    .addCase(getAllConnections.rejected, (state, action) => {
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
export const allSuccessConnectionReducer = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(getSuccessMentorConnection.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getSuccessMentorConnection.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          connection: action.payload,
        };
      })
      .addCase(getSuccessMentorConnection.rejected, (state, action) => {
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
  }
);
