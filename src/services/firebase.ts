import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User, BlogPost, ForumCategory, ForumTopic, ForumPost, Comment } from '../types';

// Firebase configuration
// Note: In a real application, these values should be stored in environment variables
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with actual API key when deploying
  authDomain: "beuhouse.firebaseapp.com",
  projectId: "beuhouse",
  storageBucket: "beuhouse.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication services
export const authService = {
  // Register a new user
  register: async (email: string, password: string, username: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update profile with username
      await updateProfile(firebaseUser, {
        displayName: username
      });
      
      // Create user document in Firestore
      const newUser: User = {
        id: firebaseUser.uid,
        username,
        email,
        joinDate: new Date(),
        role: 'user'
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...newUser,
        joinDate: serverTimestamp()
      });
      
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  },
  
  // Login user
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        return { ...userDoc.data(), id: firebaseUser.uid } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  },
  
  // Logout user
  logout: async (): Promise<boolean> => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  },
  
  // Get current user
  getCurrentUser: (): FirebaseUser | null => {
    return auth.currentUser;
  },
  
  // Reset password
  resetPassword: async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  },
  
  // Update user profile
  updateUserProfile: async (user: FirebaseUser, data: { displayName?: string, photoURL?: string }): Promise<boolean> => {
    try {
      await updateProfile(user, data);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }
};

// Blog services
export const blogService = {
  // Get all blog posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    try {
      const postsQuery = query(
        collection(db, 'blogPosts'),
        orderBy('publishDate', 'desc')
      );
      
      const querySnapshot = await getDocs(postsQuery);
      const posts: BlogPost[] = [];
      
      for (const docSnapshot of querySnapshot.docs) {
        const postData = docSnapshot.data();
        
        // Get author data
        const authorDoc = await getDoc(doc(db, 'users', postData.authorId));
        const author = { ...authorDoc.data(), id: authorDoc.id } as User;
        
        // Get comments
        const commentsQuery = query(
          collection(db, 'blogPosts', docSnapshot.id, 'comments'),
          orderBy('publishDate', 'desc')
        );
        
        const commentsSnapshot = await getDocs(commentsQuery);
        const comments: Comment[] = [];
        
        for (const commentDoc of commentsSnapshot.docs) {
          const commentData = commentDoc.data();
          const commentAuthorDoc = await getDoc(doc(db, 'users', commentData.authorId));
          
          comments.push({
            id: commentDoc.id,
            content: commentData.content,
            author: { ...commentAuthorDoc.data(), id: commentAuthorDoc.id } as User,
            publishDate: commentData.publishDate.toDate(),
            likes: commentData.likes || 0
          });
        }
        
        posts.push({
          id: docSnapshot.id,
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          author,
          publishDate: postData.publishDate.toDate(),
          updatedDate: postData.updatedDate?.toDate(),
          categories: postData.categories || [],
          tags: postData.tags || [],
          featuredImage: postData.featuredImage,
          readTime: postData.readTime || 5,
          likes: postData.likes || 0,
          comments
        });
      }
      
      return posts;
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return [];
    }
  },
  
  // Get blog post by slug
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    try {
      const postsQuery = query(
        collection(db, 'blogPosts'),
        where('slug', '==', slug),
        limit(1)
      );
      
      const querySnapshot = await getDocs(postsQuery);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const docSnapshot = querySnapshot.docs[0];
      const postData = docSnapshot.data();
      
      // Get author data
      const authorDoc = await getDoc(doc(db, 'users', postData.authorId));
      const author = { ...authorDoc.data(), id: authorDoc.id } as User;
      
      // Get comments
      const commentsQuery = query(
        collection(db, 'blogPosts', docSnapshot.id, 'comments'),
        orderBy('publishDate', 'desc')
      );
      
      const commentsSnapshot = await getDocs(commentsQuery);
      const comments: Comment[] = [];
      
      for (const commentDoc of commentsSnapshot.docs) {
        const commentData = commentDoc.data();
        const commentAuthorDoc = await getDoc(doc(db, 'users', commentData.authorId));
        
        comments.push({
          id: commentDoc.id,
          content: commentData.content,
          author: { ...commentAuthorDoc.data(), id: commentAuthorDoc.id } as User,
          publishDate: commentData.publishDate.toDate(),
          likes: commentData.likes || 0
        });
      }
      
      return {
        id: docSnapshot.id,
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        author,
        publishDate: postData.publishDate.toDate(),
        updatedDate: postData.updatedDate?.toDate(),
        categories: postData.categories || [],
        tags: postData.tags || [],
        featuredImage: postData.featuredImage,
        readTime: postData.readTime || 5,
        likes: postData.likes || 0,
        comments
      };
    } catch (error) {
      console.error('Error getting blog post by slug:', error);
      return null;
    }
  },
  
  // Create blog post
  createPost: async (post: Omit<BlogPost, 'id' | 'author' | 'publishDate' | 'comments'>, authorId: string): Promise<string | null> => {
    try {
      const docRef = await addDoc(collection(db, 'blogPosts'), {
        ...post,
        authorId,
        publishDate: serverTimestamp(),
        likes: 0
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
  }
};

// Forum services
export const forumService = {
  // Get all forum categories
  getCategories: async (): Promise<ForumCategory[]> => {
    try {
      const categoriesQuery = query(
        collection(db, 'forumCategories'),
        orderBy('name')
      );
      
      const querySnapshot = await getDocs(categoriesQuery);
      const categories: ForumCategory[] = [];
      
      for (const docSnapshot of querySnapshot.docs) {
        const categoryData = docSnapshot.data();
        
        // Get last post if available
        let lastPost: ForumPost | undefined;
        
        if (categoryData.lastPostId) {
          const lastPostDoc = await getDoc(doc(db, 'forumPosts', categoryData.lastPostId));
          
          if (lastPostDoc.exists()) {
            const postData = lastPostDoc.data();
            const authorDoc = await getDoc(doc(db, 'users', postData.authorId));
            const topicDoc = await getDoc(doc(db, 'forumTopics', postData.topicId));
            
            lastPost = {
              id: lastPostDoc.id,
              content: postData.content,
              author: { ...authorDoc.data(), id: authorDoc.id } as User,
              topic: { ...topicDoc.data(), id: topicDoc.id } as ForumTopic,
              publishDate: postData.publishDate.toDate(),
              updatedDate: postData.updatedDate?.toDate(),
              likes: postData.likes || 0
            };
          }
        }
        
        categories.push({
          id: docSnapshot.id,
          name: categoryData.name,
          description: categoryData.description,
          topics: categoryData.topics || 0,
          posts: categoryData.posts || 0,
          lastPost
        });
      }
      
      return categories;
    } catch (error) {
      console.error('Error getting forum categories:', error);
      return [];
    }
  }
};

// Storage services
export const storageService = {
  // Upload file to storage
  uploadFile: async (file: File, path: string): Promise<string | null> => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }
};

export { app, auth, db, storage };
