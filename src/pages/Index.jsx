import { Container, VStack, Text, Input, Button, Progress, useToast, Box } from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "ກະລຸນາເລືອກໄຟລ໌ PDF",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentLoaded);
      }
    };

    reader.onloadend = () => {
      toast({
        title: "ການອັບໂຫຼດສຳເລັດ",
        description: "ໄຟລ໌ PDF ຖືກອັບໂຫຼດແລ້ວ, ກຳລັງແປ...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Here you would typically call a backend service to process the file
    };

    reader.readAsDataURL(file);
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <Text fontSize="2xl" fontWeight="bold">
          ການແປ PDF ຫາ Word
        </Text>
        <Text>ອັບໂຫຼດໄຟລ໌ PDF ແລະແປເປັນໄຟລ໌ Word</Text>
        <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Input type="file" accept=".pdf" onChange={handleFileChange} p={1} />
          <Button leftIcon={<FaFileUpload />} colorScheme="blue" mt={2} onClick={handleUpload} isFullWidth>
            ອັບໂຫຼດໄຟລ໌
          </Button>
          {uploadProgress > 0 && <Progress hasStripe value={uploadProgress} mt={2} />}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
