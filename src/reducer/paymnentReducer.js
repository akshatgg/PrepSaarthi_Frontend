import { createReducer } from "@reduxjs/toolkit";
import {
  clearError,
  paymentInitator,
  paymentInitatorSub,
  reset,
} from "../action/paymentAction.js";
const initialState = {};

export const newPayment = createReducer(initialState, (builder) => {
  builder
    .addCase(paymentInitator.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(paymentInitator.fulfilled, (state, action) => {
      return {
        order: action.payload.order,
        success: action.payload.success,
        duration:action.payload.duration,
        loading: false,
      };
    })
    .addCase(paymentInitator.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        order: null,
        success: false,
        duration:null
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const newSubscription = createReducer(initialState, (builder) => {
  builder
    .addCase(paymentInitatorSub.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(paymentInitatorSub.fulfilled, (state, action) => {
      return {
        subscriptionId: action.payload.subscriptionId,
        success: action.payload.success,
        loading: false,
      };
    })
    .addCase(paymentInitatorSub.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        subscriptionId: null,
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
