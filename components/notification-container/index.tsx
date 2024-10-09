import NotificationCard from "@/components/notification/notification-card";
import useGetNotifications from "@/features/notification/api/get-notifications";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import useRedirectNotication from "@/features/notification/hooks/useRedirectNotification";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";

const NotificationContainer = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetNotifications();
  const { redirect } = useRedirectNotication();
  const { ref } = useFetchNextListOnView({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const notifications = data?.pages.flatMap((pg) => pg.data);
  return (
    <div className="grow space-y-2.5 overflow-y-auto bg-[#F7F7F7] px-5 py-2.5">
      {isLoading ? (
        [1, 2, 3, 4].map((_) => <CardSkeleton key={crypto.randomUUID()} />)
      ) : notifications?.length === 0 ? (
        <p className="mx-auto my-6 text-center text-xl text-brand-blue">
          No Notifications.
        </p>
      ) : (
        notifications?.map((notification, i) => (
          <div
            ref={notifications.length === i + 1 ? ref : null}
            key={notification._id}
          >
            <NotificationCard
              onClick={() => {
                redirect({
                  redirectType: notification.notificationRedirectType,
                });
              }}
              className={`${
                notification.notificationRedirectType &&
                "cursor-pointer transition-all hover:shadow"
              }`}
            >
              <NotificationCard.Title>
                {notification.notificationTitle}
              </NotificationCard.Title>
              <NotificationCard.Description>
                {notification.notificationMessage}
              </NotificationCard.Description>
            </NotificationCard>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationContainer;
