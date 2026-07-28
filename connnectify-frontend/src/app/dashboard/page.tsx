"use client";
import { getFriendsList } from "@/actions/friends";
import Image from "next/image";
import { Suspense } from "react";
import { Camera } from "lucide-react";
import DashboardFriendsSectionSkeleton from "@/components/dashboard-friends-section-skeleton";
import DashboardFriendsSection from "@/components/dashboard-friends-section";
import * as motion from "motion/react-client";
import { addFriendDashboard } from "@/actions/friends";
import { useRef } from "react";
import { useUser } from "@/utils/context";
import { useState, useEffect } from "react";
import { setProfileImage } from "@/db/users";
import { friend } from "@/utils/types";

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {user} = useUser();
  const [friendsList, setFriendsList] = useState<friend[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageUploading,setImageUploading]=useState(false)
  useEffect(() => {
    async function fetchFriends() {
      
      console.log("done.");
      const { data, error } = await getFriendsList();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setFriendsList(data as friend[]);
      } else {
        console.warn("No friends found or data is null");
      }
    }
    fetchFriends();
  }, [user?.uid, user?.name]);

  return (
    <section className="flex flex-col items-center justify-start w-full min-h-screen p-6 gap-16 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mt-4 text-blue-600 drop-shadow-sm">Dashboard</h1>

      <section className="flex flex-col md:flex-row items-start justify-start w-full gap-8 max-w-5xl">
        <section className="flex flex-col items-center justify-center gap-6 w-full md:w-1/3">
          <section className="relative flex max-w-[200px] max-h-[200px] overflow-hidden rounded-full clay-card p-2">
            <input
              type="file"
              multiple={false}
              ref={imageInputRef}
              className="hidden"
              onChange={async (e) => {
                setImageUploading(true);
                const files = e.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  const formData = new FormData();
                  formData.append("image", file);
                  formData.append("userId", user?.uid || "");
                 if(!file) {
                  alert("File not found upload again");
                  setImageUploading(false);
                  return;
                }
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/upload-image`,
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  const data = await res.json();
                  if (!res.ok) {
                    console.error("Error uploading image:", data);
                    alert("Error uploading image. Please try again.");
                    setImageUploading(false);
                    return;
                  }


                  if (data.imageUrl) {
                    const { data: updatedUser, error } = await setProfileImage(
                      user?.uid || "",
                      data.imageUrl
                    );
                    if (error) {
                      console.error("Error updating profile image:", error);
                      alert(`Error updating profile image. Please try again. ${error}`);
                    } else {
                      console.log(
                        "Profile image updated successfully:",
                        updatedUser
                      );
                      setImage(data.imageUrl);
                    }
                  } else {
                    console.error("Image URL not returned from server");
                  }
                  setImageUploading(false);
                }
              }
              
            }
              accept="image/*"
            />
            {imageUploading ? (
              <motion.div className="flex w-full h-full min-w-[184px] min-h-[184px] bg-gray-200 rounded-full" animate={{ opacity: [0.4, 1, 0.4]} } transition={{ duration: 1.5,repeat:Infinity }}  
              
              >
              </motion.div>
            ):
              <Image
              src={image?image:user?.image?user?.image:"/placeholder-user.jpeg"}
              alt="Dashboard Image"
              width={200}
              height={200}
              className="object-cover rounded-full w-full h-full aspect-square"
            />
          }
          
            <motion.section
              className="absolute inset-2 rounded-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (imageInputRef.current) {
                  imageInputRef.current.click();
                }
              }}
            >
              <Camera className="w-8 h-8 text-white drop-shadow-md" />
            </motion.section>
          </section>
          <section className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-xl font-extrabold text-gray-900">{user?.name}</h2>
            <p className="text-xs font-semibold text-gray-500 break-all bg-gray-200 px-3 py-1 rounded-full">{user?.uid}</p>
          </section>
          <section className="flex flex-col gap-4 p-6 clay-card w-full">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Tier Details</h2>
            <div className="flex flex-col gap-3 text-sm text-gray-600 font-medium">
              <div className="flex justify-between items-center">
                <span>Tier:</span>
                <span className="text-blue-600 font-bold px-2 py-0.5 bg-blue-100 rounded-md uppercase text-xs tracking-wide">{user?.tier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Purchased:</span>
                <span className="text-gray-900 font-semibold">{user?.dateOfPurchase}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Days left:</span>
                <span className="text-gray-900 font-semibold">{user?.daysRemaining}</span>
              </div>
            </div>
          </section>
        </section>

        {/* Friends */}
        <section className="flex flex-col items-start justify-start gap-6 w-full md:w-2/3">
          <section className="flex flex-col gap-4 p-6 clay-card w-full max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2">Friends</h2>
            <div className="flex-1 overflow-y-auto pr-2">
              <Suspense fallback={<DashboardFriendsSectionSkeleton count={3} />}>
                <DashboardFriendsSection friends={friendsList} />
              </Suspense>
            </div>

            <form
              className="flex w-full gap-3 mt-4 pt-4 border-t border-gray-100"
              onSubmit={async (e) => {
                e.preventDefault();
                if (inputRef.current) {
                  const { data, error } = await addFriendDashboard(
                    inputRef.current.value
                  );
                  if (error) {
                    console.error("Error adding friend:", error);
                    alert(error);
                  } else {
                    console.log("Friend added successfully:", data);
                    setFriendsList((prev) => [...prev, data as friend]);
                  }
                  inputRef.current.value = "";
                }
              }}
            >
              <input
                ref={inputRef}
                type="text"
                id="addFriend"
                placeholder="Add friend's user id..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all clay-btn shrink-0"
              >
                Add Friend
              </button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}
