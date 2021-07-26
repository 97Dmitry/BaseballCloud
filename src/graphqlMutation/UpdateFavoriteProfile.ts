import { gql } from "@apollo/client";

export const UpdateFavoriteProfile = gql`
  mutation UpdateFavoriteProfile($form: UpdateFavoriteProfileInput!) {
    update_favorite_profile(input: $form) {
      favorite
    }
  }
`;

export interface IUpdateFavoriteProfile {
  favorite: boolean;
}

export interface IUpdateFavoriteProfileVars {
  form: { profile_id: number; favorite: boolean };
}
