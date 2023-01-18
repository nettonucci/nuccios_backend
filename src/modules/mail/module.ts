import { Module } from '@nestjs/common';

import { MailService } from './service';
import { MailTemplatesModule } from '../mail_templates/module';

@Module({
    imports: [MailTemplatesModule],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}