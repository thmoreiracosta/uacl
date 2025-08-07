import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { db, auth, storage } from "../../firebase";

interface ProfileAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ProfileSocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  profession: string;
  company: string;
  bio: string;
  address: ProfileAddress;
  socialMedia: ProfileSocialMedia;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    profession: "",
    company: "",
    bio: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get profile image from auth
        if (user.photoURL) {
          setProfileImage(user.photoURL);
        }

        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // If photoURL exists in Firestore but not in auth, use it
          if (!user.photoURL && userData.photoURL) {
            setProfileImage(userData.photoURL);
          }

          setProfileData({
            name: user.displayName || "",
            email: user.email || "",
            phone: userData.phone || "",
            profession: userData.profession || "",
            company: userData.company || "",
            bio: userData.bio || "",
            address: {
              street: userData.address?.street || "",
              number: userData.address?.number || "",
              complement: userData.address?.complement || "",
              neighborhood: userData.address?.neighborhood || "",
              city: userData.address?.city || "",
              state: userData.address?.state || "",
              zipCode: userData.address?.zipCode || "",
            },
            socialMedia: {
              facebook: userData.socialMedia?.facebook || "",
              instagram: userData.socialMedia?.instagram || "",
              linkedin: userData.socialMedia?.linkedin || "",
              twitter: userData.socialMedia?.twitter || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      if (parent === "address") {
        setProfileData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          },
        }));
      } else if (parent === "socialMedia") {
        setProfileData((prev) => ({
          ...prev,
          socialMedia: {
            ...prev.socialMedia,
            [child]: value,
          },
        }));
      }
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateProfileData = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profileData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Email inválido";
    }

    if (
      profileData.phone &&
      !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(profileData.phone)
    ) {
      newErrors.phone = "Formato inválido. Use (99) 99999-9999";
    }

    if (
      profileData.address.zipCode &&
      !/^\d{5}-\d{3}$/.test(profileData.address.zipCode)
    ) {
      newErrors["address.zipCode"] = "CEP inválido. Use 99999-999";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordData = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Senha atual é obrigatória";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "A senha deve ter pelo menos 8 caracteres";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) {
      return;
    }

    const file = files[0];

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrors({ profileImage: "Formato inválido. Use JPG ou PNG" });
      return;
    }

    if (file.size > maxSize) {
      setErrors({ profileImage: "Imagem muito grande. Máximo 5MB" });
      return;
    }

    try {
      // Clear previous errors
      setErrors({});

      // Create a unique filename to avoid cache issues
      const timestamp = new Date().getTime();
      const fileName = `profile_${user.uid}_${timestamp}`;

      // Create storage reference
      const storageRef = ref(storage, `profile_images/${fileName}`);

      // Start upload
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
          setUploadProgress(progress);
        },
        (error: StorageError) => {
          // Handle upload errors
          console.error("Error uploading image:", error);
          setErrors({ profileImage: `Erro ao fazer upload: ${error.message}` });
          setUploadProgress(0);
        },
        async () => {
          try {
            // Upload completed successfully
            console.log("Upload completed");

            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);

            if (!user) {
              throw new Error("Usuário não está autenticado");
            }

            // Update auth profile
            await updateProfile(user, { photoURL: downloadURL });
            console.log("Auth profile updated");

            // Update Firestore document
            await updateDoc(doc(db, "users", user.uid), {
              photoURL: downloadURL,
              updatedAt: new Date(),
            });
            console.log("Firestore document updated");

            // Update UI
            setProfileImage(downloadURL);
            setUploadProgress(0);
            setSuccessMessage("Imagem de perfil atualizada com sucesso!");

            // Clear success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
          } catch (error) {
            console.error("Error finalizing upload:", error);
            setErrors({ profileImage: "Erro ao finalizar upload da imagem" });
          }
        }
      );
    } catch (error) {
      console.error("Error handling profile image:", error);
      setErrors({ profileImage: "Erro ao processar imagem" });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    // Validate form data
    if (!validateProfileData()) return;

    try {
      setSaving(true);

      // Update display name in auth
      if (user.displayName !== profileData.name) {
        await updateProfile(user, { displayName: profileData.name });
      }

      // Update email if changed
      if (user.email !== profileData.email) {
        await updateEmail(user, profileData.email);
      }

      // Update additional data in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        phone: profileData.phone,
        profession: profileData.profession,
        company: profileData.company,
        bio: profileData.bio,
        address: profileData.address,
        socialMedia: profileData.socialMedia,
        updatedAt: new Date(),
      });

      setSuccessMessage("Perfil atualizado com sucesso!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);

      if (
        error instanceof FirebaseError &&
        error.code === "auth/requires-recent-login"
      ) {
        setErrors({
          general:
            "Para alterar seu email, é necessário fazer login novamente por questões de segurança.",
        });
      } else {
        setErrors({
          general: "Erro ao atualizar perfil. Por favor, tente novamente.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) return;

    // Validate password data
    if (!validatePasswordData()) return;

    try {
      setChangingPassword(true);

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, passwordData.newPassword);

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordSuccessMessage("Senha alterada com sucesso!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error changing password:", error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          setPasswordErrors({ currentPassword: "Senha atual incorreta" });
        } else {
          setPasswordErrors({
            general: "Erro ao alterar senha. Por favor, tente novamente.",
          });
        }
      } else {
        setPasswordErrors({
          general: "Erro ao alterar senha. Por favor, tente novamente.",
        });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setProfileData((prev) => ({
      ...prev,
      phone: formattedPhone,
    }));
  };

  const formatCEP = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 5) {
      return digits;
    } else {
      return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
    }
  };

  const handleCEPChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        zipCode: formattedCEP,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Cabeçalho com saudação */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-primary">
            Bem-vindo, {profileData.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-600 mt-2">
            Aqui você pode gerenciar suas informações pessoais e configurações
            de conta.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-primary py-4 px-6">
            <h2 className="text-2xl font-serif font-bold text-white">
              Meu Perfil
            </h2>
          </div>

          <div className="p-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div
                  className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-primary"
                  
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary bg-opacity-10">
                      <svg
                        className="w-16 h-16 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Upload progress overlay */}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="text-white font-bold">
                        {Math.round(uploadProgress)}%
                      </div>
                    </div>
                  )}

                 
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                />
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profileImage}
                  </p>
                )}
              </div>              
            </div>




            

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            {/* Profile Form */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">
                  Informações Pessoais
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Nome Completo*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="phone"
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(99) 99999-9999"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="profession"
                  >
                    Profissão
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={profileData.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="company"
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={profileData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="bio"
                  >
                    Biografia
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Conte um pouco sobre você..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">
                  Endereço
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="address.street"
                  >
                    Rua
                  </label>
                  <input
                    type="text"
                    id="address.street"
                    name="address.street"
                    value={profileData.address.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="address.number"
                    >
                      Número
                    </label>
                    <input
                      type="text"
                      id="address.number"
                      name="address.number"
                      value={profileData.address.number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="address.complement"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="address.complement"
                      name="address.complement"
                      value={profileData.address.complement}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="address.neighborhood"
                  >
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="address.neighborhood"
                    name="address.neighborhood"
                    value={profileData.address.neighborhood}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="address.city"
                  >
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={profileData.address.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="address.state"
                  >
                    Estado
                  </label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={profileData.address.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="address.zipCode"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={profileData.address.zipCode}
                    onChange={handleCEPChange}
                    placeholder="99999-999"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors["address.zipCode"]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors["address.zipCode"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors["address.zipCode"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">
                  Redes Sociais
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="socialMedia.facebook"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </span>
                  </label>
                  <input
                    type="text"
                    id="socialMedia.facebook"
                    name="socialMedia.facebook"
                    value={profileData.socialMedia.facebook}
                    onChange={handleInputChange}
                    placeholder="URL do seu perfil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="socialMedia.instagram"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </span>
                  </label>
                  <input
                    type="text"
                    id="socialMedia.instagram"
                    name="socialMedia.instagram"
                    value={profileData.socialMedia.instagram}
                    onChange={handleInputChange}
                    placeholder="URL do seu perfil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="socialMedia.linkedin"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </span>
                  </label>
                  <input
                    type="text"
                    id="socialMedia.linkedin"
                    name="socialMedia.linkedin"
                    value={profileData.socialMedia.linkedin}
                    onChange={handleInputChange}
                    placeholder="URL do seu perfil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="socialMedia.twitter"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </span>
                  </label>
                  <input
                    type="text"
                    id="socialMedia.twitter"
                    name="socialMedia.twitter"
                    value={profileData.socialMedia.twitter}
                    onChange={handleInputChange}
                    placeholder="URL do seu perfil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Salvando...
                  </span>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary py-4 px-6">
            <h2 className="text-2xl font-serif font-bold text-white">
              Alterar Senha
            </h2>
          </div>

          <div className="p-6">
            {/* Password Success Message */}
            {passwordSuccessMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {passwordSuccessMessage}
              </div>
            )}

            {/* Password General Error */}
            {passwordErrors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {passwordErrors.general}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="currentPassword"
                >
                  Senha Atual*
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    passwordErrors.currentPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2"></div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="newPassword"
                >
                  Nova Senha*
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    passwordErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.newPassword}
                  </p>
                )}
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-600 mb-1">
                      Força da senha:
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordData.newPassword.length < 6
                            ? "bg-red-500"
                            : passwordData.newPassword.length < 8
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            passwordData.newPassword.length * 10
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmar Nova Senha*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    passwordErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {changingPassword ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Alterando...
                  </span>
                ) : (
                  "Alterar Senha"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
