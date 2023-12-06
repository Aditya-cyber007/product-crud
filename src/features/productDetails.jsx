import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//create actions

export const createProducts = createAsyncThunk('createProducts',async(data,{rejectWithValue})=>{
    const response=await fetch('http://localhost:3001/products',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    try{
            const product=await response.json();
            return product;
        }
    catch(error){
        return rejectWithValue(error.message);
    }
    })

    //show all products

    export const showProducts = createAsyncThunk('showProducts',async(data,{rejectWithValue})=>{
        const response=await fetch('http://localhost:3001/products',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        try{
                const product=await response.json();
                return product;
            }
        catch(error){
            return rejectWithValue(error.message);
        }
        })

        //delete product
        export const deleteProducts = createAsyncThunk('deleteProducts',async(id,{rejectWithValue})=>{
            const response=await fetch(`http://localhost:3001/products/${id}`,{
                method:'DELETE',
            });
            try{
                    const product=await response.json();
                    return product;
                }
            catch(error){
                return rejectWithValue(error.message);
            }
            })



export const productDetails = createSlice({
    name: "productDetails",
    initialState: {
        products:[],
        loading: false,
        error:null,
    },
        extraReducers (builder){
            builder.addCase(createProducts.pending,(state,action)=>{
                state.loading=true;
            });
            builder.addCase(createProducts.fulfilled,(state,action)=>{
                state.loading=false;
                state.products.push(action.payload);
            });
            builder.addCase(createProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            });

            builder.addCase(showProducts.pending,(state,action)=>{
                state.loading=true;
            });
            builder.addCase(showProducts.fulfilled,(state,action)=>{
                state.loading=false;
                state.products=action.payload;
            });
            builder.addCase(showProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            });  
            builder.addCase(deleteProducts.pending,(state,action)=>{
                state.loading=true;
            });
            builder.addCase(deleteProducts.fulfilled,(state,action)=>{
                state.loading=false;
                const id=action.payload;
                if(id){
                    state.products=state.products.filter((product)=>product.id!==id);
                }
            });
            builder.addCase(deleteProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            });
        }
    
});

export default productDetails.reducer;