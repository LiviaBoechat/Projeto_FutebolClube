export default class Email {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
