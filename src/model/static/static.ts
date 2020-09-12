export class StaticService {
  static searchOption: {
    token: string;
    roleList: any;
    userID: string;
    hostname: string;
    saveObjectType: string;
    searchObject: any;
    sortObject: any
  }
  static token: string
  static roleList: any
  static userID: string
  static hostname: string
  static saveObjectType: string
  static searchObject: any
  static sortObject: any
  setToken (token: string) {
    StaticService.token = token
  }
  setRoleList (name: any[]) {
    const object = {}
    for (const value of name) {
      object['' + value] = true
    }
    StaticService.roleList = object
  }
  setUserID (userID: string) {
    StaticService.userID = userID
  }
  setHostname (hostname: string) {
    StaticService.hostname = hostname
  }
  setObjectType (saveObjectType: string) {
    StaticService.saveObjectType = saveObjectType
  }
  setSearchObject (searchObject: any) {
    console.log(searchObject)
    StaticService.searchObject = searchObject
  }
  setSortObject (sortObject: any) {
    console.log(sortObject)
    StaticService.sortObject = sortObject
  }
}
