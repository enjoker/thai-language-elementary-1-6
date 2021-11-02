import AsyncStorage from '@react-native-async-storage/async-storage';
export const USER_DETAIL = 'USER_DETAIL';
export const USER_MODALRENAME = 'USER_MODALRENAME';
export const USER_PRIVILEGE = 'USER_PRIVILEGE';

export const getUser = () => {
   return async (dispatch, getState) => {
      try {
         const getUserName = await AsyncStorage.getItem('user')
         dispatch({ type: USER_DETAIL, userName: getUserName });
      } catch (error) {
         console.log(error)
      }
   }
}

export const addUser = (name) => {
   return async (dispatch, getState) => {
      try {
         await AsyncStorage.setItem('user', name)
         dispatch({ type: USER_DETAIL, userName: name });
      } catch (error) {
         console.log(error)
      }
   }
}

export const showRenameModal = () => {
   return async (dispatch, getState) => {
      dispatch({ type: USER_MODALRENAME, showModal: true });
   }
}

export const getPrivilege = () => {
   return async (dispatch, getState) => {
      try {
         const getUserPrivilege = await AsyncStorage.getItem('privilege')
         dispatch({ type: USER_PRIVILEGE, userPrivilege: getUserPrivilege });
      } catch (error) {
         console.log(error)
      }
   }
}

export const addPrivilege = (amountPrivilege) => {
   return async (dispatch, getState) => {
      try {
         await AsyncStorage.setItem('privilege',amountPrivilege)
         dispatch({ type: USER_PRIVILEGE, userPrivilege: amountPrivilege });
      } catch (error) {
         console.log(error)
      }
   }
}