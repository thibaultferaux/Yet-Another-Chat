/**
 * Deletes from available chats
 */
export const deleteFromAvailableChats = id => {
    const element = document.getElementById(id);
    if(element) element.remove();
}