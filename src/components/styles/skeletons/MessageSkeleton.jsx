import { Box, Skeleton, Paper } from "@mui/material";

const MessageSkeleton = () => {
  // Create an array of 3 messages for the skeleton
  const skeletonMessages = Array(3).fill(0);
  
  return (
    <Box sx={{ flex: 1, overflowY: "auto", p: 2, "& > *": { mb: 2 } }}>
      {/* Incoming message skeletons */}
      {skeletonMessages.map((_, index) => (
        <Box
          key={`incoming-${index}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1 }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={60} height={20} />
          </Box>
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              maxWidth: "60%",
              borderRadius: 2,
            }}
          >
            <Skeleton variant="rectangular" width={200} height={40} />
          </Paper>
        </Box>
      ))}

      {/* Outgoing message skeletons */}
      {skeletonMessages.map((_, index) => (
        <Box
          key={`outgoing-${index}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1 }}>
            <Skeleton variant="text" width={60} height={20} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              maxWidth: "60%",
              borderRadius: 2,
              bgcolor: "primary.light",
            }}
          >
            <Skeleton 
              variant="rectangular" 
              width={180} 
              height={24} 
              sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
            />
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default MessageSkeleton;