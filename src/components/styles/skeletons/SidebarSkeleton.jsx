import { Box, Skeleton, Divider } from "@mui/material";

const SidebarSkeleton = () => {
  // Create an array of 8 contacts for the skeleton
  const skeletonContacts = Array(8).fill(0);

  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: 80, lg: 288 },
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton 
            variant="text" 
            width={80} 
            height={24}
            sx={{ display: { xs: "none", lg: "block" } }}
          />
        </Box>
        
        <Box sx={{ mt: 1.5, display: { xs: "none", lg: "flex" }, gap: 1 }}>
          <Skeleton variant="rectangular" width={120} height={24} />
          <Skeleton variant="text" width={60} height={24} />
        </Box>
      </Box>

      <Box sx={{ overflowY: "auto", width: "100%", py: 1.5 }}>
        {skeletonContacts.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
          >
            <Skeleton variant="circular" width={48} height={48} />
            
            <Box 
              sx={{ 
                display: { xs: "none", lg: "block" },
                width: "100%"
              }}
            >
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarSkeleton;