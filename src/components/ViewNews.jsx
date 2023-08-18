import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';





function ViewNews() {
  const {currentArticle} = useSelector((state)=>state.article);
  const {currentUser}= useSelector((state)=>state.user);
  const [wished,setWished] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(currentArticle);
  },[currentArticle]);


const handleAddWishlist = async()=>{
  try {
    const collectionRef = collection(db, "users");
    const email = currentUser.email
    console.log("email",email);
    const uuid = uuidv4();
    
    const itemToAdd = {...currentArticle};
    itemToAdd._id = uuid;
 // Create a query with a condition to find the document
 const q = query(collectionRef, where("email", "==", email));

 // Fetch documents from Firestore based on the query
 const querySnapshot = await getDocs(q);

 if (!querySnapshot.empty) {
   // The query found matching documents
   querySnapshot.forEach(async (docSnapshot) => {
     const docId = docSnapshot.id;
     console.log("docID",docId);
     // Reference the specific document to update
     const documentRef = doc(db, "users", docId);

     // Update the wishlist array
     await updateDoc(documentRef, {
       wishlist: [...docSnapshot.data().wishlist, itemToAdd]
     });

     console.log("Wishlist updated successfully.");
     alert("Wishlist Added successfully.");
     setWished(true);
   });
 } else {
   // No matching documents found
   console.log("No documents found with the specified email.");
 }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
    <Navbar view={true}/>
    <div className='flex flex-col gap-4 bg-gray-200 min-h-screen items-center p-4'>

    <div className='text-xl font-semibold w-11/12'>{currentArticle.title }</div>
    <div className='flex flex-col items-center md:flex-row md:gap-9'>
      <div><span className='font-semibold'>Author : </span>{currentArticle.author}</div>
    <div><span className='font-semibold'>published at: </span>{currentArticle.publishedAt}</div>
    </div>
    <img src={currentArticle.urlToImage} alt="Image not available" className='w-11/12 h-44 md:h-80 '/>
    <p className='h-fit w-11/12'>{currentArticle.description }</p>
    <button className='border border-solid border-white w-3/4 md:w-2/4 p-2 rounded cursor-pointer flex items-center justify-center gap-2' onClick={handleAddWishlist}> {wished?<><span>Added to wishlist</span> <AiFillHeart/> </>:<><span>Add to wishlist</span> <AiOutlineHeart/> </>}</button>
    <a href={currentArticle.url} target='_Blank' className='flex items-center justify-center text-lg font-bold gap-2 text-red-500'>Full Article  <AiOutlineArrowRight/> </a>
    </div>
    </>
  )
}

export default ViewNews