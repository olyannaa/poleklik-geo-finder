import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
  showFreeParcelUsedMessage?: boolean;
}

export const AuthDialog = ({ open, onOpenChange, onAuthSuccess, showFreeParcelUsedMessage = false }: AuthDialogProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codeSent) {
      // Отправка кода
      toast.success("Код отправлен на email");
      setCodeSent(true);
    } else {
      // Проверка кода - тестовый аккаунт test@example.com с кодом 1234
      if (email === "test@example.com" && code === "1234") {
        toast.success("Вы успешно вошли! Теперь вы можете покупать дополнительные участки");
        onAuthSuccess();
        onOpenChange(false);
        setCodeSent(false);
        setCode("");
      } else if (code.length === 4) {
        // Принимаем любой 4-значный код для демонстрации
        toast.success("Вы успешно вошли! Теперь вы можете покупать дополнительные участки");
        onAuthSuccess();
        onOpenChange(false);
        setCodeSent(false);
        setCode("");
      } else {
        toast.error("Неверный код. Попробуйте еще раз");
      }
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codeSent) {
      // Отправка кода
      toast.success("Код отправлен в SMS");
      setCodeSent(true);
    } else {
      // Проверка кода - принимаем любой 4-значный код
      if (code.length === 4) {
        toast.success("Вы успешно вошли! Теперь вы можете покупать дополнительные участки");
        onAuthSuccess();
        onOpenChange(false);
        setCodeSent(false);
        setCode("");
      } else {
        toast.error("Неверный код. Попробуйте еще раз");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в ПолеКлик</DialogTitle>
          <DialogDescription>
            {showFreeParcelUsedMessage 
              ? "Ваш бесплатный участок использован. Зарегистрируйтесь для покупки дополнительных участков"
              : "Зарегистрируйтесь для покупки дополнительных участков"}
          </DialogDescription>
          {!showFreeParcelUsedMessage && (
            <div className="bg-info/10 border border-info/20 rounded-lg p-3 mt-2">
              <p className="text-xs font-medium text-info-foreground">Тестовый аккаунт:</p>
              <p className="text-xs text-muted-foreground mt-1">Email: test@example.com</p>
              <p className="text-xs text-muted-foreground">Код: 1234</p>
            </div>
          )}
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Телефон</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={codeSent}
                />
              </div>

              {codeSent && (
                <div className="space-y-2">
                  <Label htmlFor="email-code">Код из письма</Label>
                  <Input
                    id="email-code"
                    type="text"
                    placeholder="Введите код"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {codeSent ? "Войти" : "Получить код"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={handlePhoneAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={codeSent}
                />
              </div>

              {codeSent && (
                <div className="space-y-2">
                  <Label htmlFor="phone-code">Код из SMS</Label>
                  <Input
                    id="phone-code"
                    type="text"
                    placeholder="Введите код"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {codeSent ? "Войти" : "Получить код"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
