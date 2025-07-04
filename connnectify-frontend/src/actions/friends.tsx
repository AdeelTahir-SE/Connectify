"use server"
import { cookies } from "next/headers";
import { getFriends,addFriend,userExists } from "@/db/friends";

export async function getFriendsList() {
    const user= (await cookies()).get("user");
    if (!user) {
        return { data: null, error: "User not found" };
    }
    const userId = JSON.parse(user.value).uid;
    if (!userId) {
        return { data: null, error: "User ID not found" };
    }
    try {
        const friends = await getFriends(userId);
        if (friends?.error) {
            return { data: null, error: friends.error };
        }
        return { data: friends.data, error: null };
    } catch (error) {
        return { data: null, error: `Error fetching friends: ${error}` };
    }
}
export async function addFriendDashboard(friendId: string) {
    const user = (await cookies()).get("user");
    if (!user) {
        return { data: null, error: "User not found" };
    }
    const userId = JSON.parse(user.value).uid;
    if (!userId) {
        return { data: null, error: "User ID not found" };
    }
    const friendExists=await userExists(friendId);
    if (friendExists?.error) {
        return { data: null, error: friendExists.error };
    }
    if (!friendExists?.data) {
        return { data: null, error: "Friend does not exist" };
    }
    try {
        const result = await addFriend(userId, friendId);

        if (result.error) {
            return { data: null, error: result.error };
        }
        return { data: result.data, error: null };
    } catch (error) {
        return { data: null, error: `Error adding friend: ${error}` };
    }
}