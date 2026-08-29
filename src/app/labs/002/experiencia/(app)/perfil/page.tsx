"use client";

import { useState } from "react";
import { NovaProfileScreen } from "@/components/labs/002/screens";
import { NovaNotificationsPanel } from "@/components/labs/002/notifications-panel";
import { useFavoritesOptional } from "@/components/labs/002/favorites-context";

export default function PerfilPage() {
  const favorites = useFavoritesOptional();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <NovaProfileScreen
        favoritesCount={favorites?.favoriteIds.length ?? 0}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />
      <NovaNotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );
}
