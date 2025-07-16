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
    <section className="flex flex-col items-center justify-start w-full min-h-screen p-6 gap-16">
      <h1 className="dashboard-title">Dashboard</h1>

      <section className="flex flex-col md:flex-row items-start justify-start w-full gap-8">
        <section className="flex flex-col items-center justify-center gap-4">
          <section className="relative flex max-w-[200px] max-h-[200px] overflow-hidden rounded-xl">
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
              <motion.div className="flex min-w-[200px] min-h-[200px] bg-gray-400 " animate={{ opacity: [0.4, 1, 0.4]} } transition={{ duration: 1.5,repeat:Infinity }}  
              
              >
              </motion.div>
            ):
              <Image
              src={image?image:user?.image?user?.image:"/placeholder-user.jpeg"}
              alt="Dashboard Image"
              width={200}
              height={200}
              className="object-cover"
            />
          }
          
            <motion.section
              className="absolute inset-0 flex flex-col items-center justify-center bg-black"
              whileHover={{ opacity: 0.4 }}
              initial={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (imageInputRef.current) {
                  imageInputRef.current.click();
                }
              }}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.section>
          </section>
          <section className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-bold text-white">{user?.name}</h2>
            <p className="text-sm text-gray-400 break-all">{user?.uid}</p>
          </section>
          <section className="flex flex-col gap-2 p-4 border border-gray-700 rounded-lg w-full bg-gray-800">
            <h2 className="text-xl font-semibold text-white">Tier Details</h2>
            <div className="flex flex-col gap-1 text-gray-300">
              <p>
                Tier: <span className="text-white">{user?.tier}</span>
              </p>
              <p>
                Date of Purchase:{" "}
                <span className="text-white">{user?.dateOfPurchase}</span>
              </p>
              <p>
                Days remaining:{" "}
                <span className="text-white">{user?.daysRemaining}</span>
              </p>
            </div>
          </section>
        </section>

        {/* Friends */}
        <section className="flex flex-col items-start justify-start gap-6 w-full max-w-2xl">
          <section className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg w-full bg-gray-800 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-white">Friends</h2>
            <Suspense fallback={<DashboardFriendsSectionSkeleton count={3} />}>
              <DashboardFriendsSection friends={friendsList} />
            </Suspense>

            <form
              className="flex w-full gap-2 mt-2"
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
                className="flex-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded hover:bg-cyan-700"
              >
                Add
              </button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}
