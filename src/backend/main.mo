import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type StudentSignup = {
    id : Nat;
    fullName : Text;
    phoneNumber : Text;
    email : Text;
    courseOfInterest : Text;
    createdBy : Principal;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let studentSignups = Map.empty<Nat, StudentSignup>();
  var nextId = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func signup(fullName : Text, phoneNumber : Text, email : Text, courseOfInterest : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create signups");
    };
    let id = nextId;
    let signup : StudentSignup = {
      id;
      fullName;
      phoneNumber;
      email;
      courseOfInterest;
      createdBy = caller;
    };
    studentSignups.add(id, signup);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getMySignups() : async [StudentSignup] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their signups");
    };
    let filteredList = List.empty<StudentSignup>();
    for ((id, signup) in studentSignups.entries()) {
      if (signup.createdBy == caller) {
        filteredList.add(signup);
      };
    };
    filteredList.toArray();
  };

  public query ({ caller }) func getAllSignups() : async [StudentSignup] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all signups");
    };
    studentSignups.values().toArray();
  };

  public query ({ caller }) func getSignupById(id : Nat) : async ?StudentSignup {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view signup by ID");
    };
    studentSignups.get(id);
  };
};
