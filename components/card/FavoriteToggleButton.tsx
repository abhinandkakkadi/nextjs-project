import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const user = await currentUser();
  if (!user?.id) {
    return <CardSignInButton />;
  }

  const favoriteId = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
}

export default FavoriteToggleButton;
