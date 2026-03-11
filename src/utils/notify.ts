type NotifyType = "success" | "error" | "info";

export const notify = (message: string, type: NotifyType = "info") => {
  const event = new CustomEvent("app-notify", {
    detail: { message, type },
  });

  window.dispatchEvent(event);
};
