const initialState = {
  fetching: false,
  error: false,
  allComments: [],
  selectedStrainsComments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------****** UI ACTIONS ******-----------

    case "SET_COMMENT_DISPLAY":
      return {
        ...state,
        selectedComment: action.comment,
      };
    case "SET_SELECTED_STRAINS_COMMENTS":
      return {
        ...state,
        selectedStrainsComments: action.comments,
      };
    // case 'SET_STRAIN_DISPLAY':
    //     return {
    //         ...state,
    //         selectedStrainsComments: action.strain.comments
    //     }

    // case 'DISPLAY_SNACKBAR_ADD_SUCCESS':
    //     return {
    //         ...state,
    //         snackBarSuccessDisplay: action.payload
    //     }
    // case 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS':
    //     return {
    //         ...state,
    //         snackBarSuccessDisplay: action.payload
    //     }

    // ----------****** ASYNC ACTIONS ******-----------

    // ----------FETCH COMMENTS-------  *****************************

    case "FETCH_COMMENTS_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "FETCH_COMMENTS_SUCCESS":
      const data0 = action.comments;
      const sorted0 = data0.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      return {
        ...state,
        fetching: false,
        allComments: action.comments,
        selectedStrainsComments: [...sorted0],
      };
    case "FETCH_COMMENTS_FAILURE":
      return {
        ...state,
        fetching: false,
        error: action.error,
      };

    // ----------ADD COMMENT-------  *****************************

    case "POST_COMMENT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "POST_COMMENT_FAILURE":
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case "POST_COMMENT_SUCCESS":
      const data1 = [...state.selectedStrainsComments, action.comment];
      const sorted1 = data1.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      let type = action.comment.commentable_type;

      if (type === "Strain") {
        return {
          ...state,
          fetching: false,
          allComments: [...state.allComments, action.comment],
          selectedStrainsComments: [...sorted1],
          // selectedStrain: action.strain
        };
      } else if (type === "Comment") {
        const subComments = () => {
          let comment = state.selectedStrainsComments.filter(
            (comment) => comment.id === action.comment.commentable_id
          );

          let newSubComments = [...comment[0].comments, action.comment];
          comment[0].comments = newSubComments;

          let newComments = state.selectedStrainsComments.filter(
            (comment) => comment.id != action.comment.commentable_id
          );

          let dataSub = [...newComments, ...comment];

          let sortedData = dataSub.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          return {
            ...state,
            fetching: false,
            allComments: [...sortedData],
            selectedStrainsComments: [...sortedData],
          };
        };

        return subComments();
      }

    // ----------ADD LIKE TO COMMENT-------  *****************************

    case "POST_LIKE_SUCCESS":
      let likeType = action.like.likeable_type;

      if (likeType === "Strain") {
        return {
          ...state,
          // fetching: false,
          // allComments: [...state.allComments, action.comment],
          // selectedStrainsComments: [...sorted1]
          // selectedStrain: action.strain
        };
      } else if (likeType === "Comment") {
        const subCommentsLikes = () => {
          const selectedComment = state.selectedStrainsComments.filter(
            (comment) => comment.id === action.like.likeable_id
          )[0];
          const newCommentLikes = [...selectedComment.likes, action.like];
          selectedComment.likes = newCommentLikes;
          const newCommentsData = [
            ...state.selectedStrainsComments.filter(
              (comment) => comment.id != selectedComment.id
            ),
            selectedComment,
          ];

          let sortedLikeData = newCommentsData.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          return {
            ...state,
            fetching: false,
            // allComments: [...sortedData],
            selectedStrainsComments: [...sortedLikeData],
          };
        };

        return subCommentsLikes();
      }

    // ----------PATCH ENTRY-------  *****************************

    case "PATCH_COMMENT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "PATCH_COMMENT_FAILURE":
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case "PATCH_COMMENT_SUCCESS":
      const data = [
        ...[
          ...state.selectedStrainsComments.filter(
            (comment) => comment.id != action.comment.id
          ),
        ],
        action.comment,
      ];

      const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        allComments: [
          ...[
            ...state.allComments.filter(
              (comment) => comment.id != action.comment.id
            ),
          ],
          action.comment,
        ],
        selectedStrainsComments: [...sorted],
        // [...state.allComments, action.comment],
        // selectedStrain: action.strain
      };

    // ----------DELETE ENTRY-------  *****************************

    case "DELETE_COMMENT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        fetching: false,
        allComments: state.allComments.filter(
          (comment) => comment.id != action.commentId.id
        ),
        selectedStrainsComments: state.selectedStrainsComments.filter(
          (comment) => comment.id != action.commentId
        ),
      };

    default:
      return state;
  }
};

export default commentsReducer;
